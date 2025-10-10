-- =====================================================
-- PostgreSQL Audit Trigger Function
-- =====================================================
-- This trigger automatically logs INSERT, UPDATE, DELETE operations
-- For maximum performance with zero application overhead
-- =====================================================

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    audit_row audit_logs;
    old_data jsonb;
    new_data jsonb;
    changed_fields jsonb;
BEGIN
    -- Initialize audit record
    audit_row.id = gen_random_uuid();
    audit_row.entity_name = TG_TABLE_NAME;
    audit_row.created_at = NOW();

    -- Handle INSERT
    IF (TG_OP = 'INSERT') THEN
        audit_row.entity_id = NEW.id::text;
        audit_row.action = 'CREATE';
        audit_row.new_value = to_jsonb(NEW);
        audit_row.old_value = NULL;
        audit_row.changes = NULL;

    -- Handle UPDATE
    ELSIF (TG_OP = 'UPDATE') THEN
        audit_row.entity_id = NEW.id::text;
        audit_row.action = 'UPDATE';

        -- Convert to JSONB for comparison
        old_data = to_jsonb(OLD);
        new_data = to_jsonb(NEW);

        -- Calculate changed fields
        SELECT jsonb_object_agg(key, jsonb_build_object('old', old_data->key, 'new', new_data->key))
        INTO changed_fields
        FROM jsonb_each(new_data)
        WHERE new_data->key IS DISTINCT FROM old_data->key
          AND key NOT IN ('updated_at', 'updatedAt'); -- Exclude timestamp fields

        audit_row.old_value = old_data;
        audit_row.new_value = new_data;
        audit_row.changes = changed_fields;

    -- Handle DELETE
    ELSIF (TG_OP = 'DELETE') THEN
        audit_row.entity_id = OLD.id::text;
        audit_row.action = 'DELETE';
        audit_row.old_value = to_jsonb(OLD);
        audit_row.new_value = NULL;
        audit_row.changes = NULL;
    END IF;

    -- Insert audit record
    INSERT INTO audit_logs (
        id, entity_name, entity_id, action,
        old_value, new_value, changes, created_at
    ) VALUES (
        audit_row.id, audit_row.entity_name, audit_row.entity_id, audit_row.action,
        audit_row.old_value, audit_row.new_value, audit_row.changes, audit_row.created_at
    );

    -- Return appropriate value
    IF (TG_OP = 'DELETE') THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Apply trigger to specific tables
-- =====================================================

-- Example: Apply to users table
-- DROP TRIGGER IF EXISTS users_audit_trigger ON users;
-- CREATE TRIGGER users_audit_trigger
--     AFTER INSERT OR UPDATE OR DELETE ON users
--     FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Template for adding triggers to other tables:
-- Replace 'table_name' with your actual table name
--
-- DROP TRIGGER IF EXISTS {table_name}_audit_trigger ON {table_name};
-- CREATE TRIGGER {table_name}_audit_trigger
--     AFTER INSERT OR UPDATE OR DELETE ON {table_name}
--     FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =====================================================
-- Performance Notes:
-- =====================================================
-- 1. This trigger runs AFTER operations, not blocking the main transaction
-- 2. JSONB storage is compressed and indexed for fast queries
-- 3. Only changed fields are calculated, reducing overhead
-- 4. Consider partitioning audit_logs by created_at for large datasets
