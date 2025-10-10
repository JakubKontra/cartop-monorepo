-- =====================================================
-- Partition Audit Logs Table by Time
-- =====================================================
-- For high-volume audit logs, partition by month for better performance
-- This is optional but recommended for production systems
-- =====================================================

-- Step 1: Convert existing table to partitioned table (if needed)
-- WARNING: This requires downtime. Do this before inserting data.

-- Create new partitioned table
-- CREATE TABLE audit_logs_new (
--     id uuid NOT NULL,
--     entity_name varchar(100) NOT NULL,
--     entity_id varchar(100) NOT NULL,
--     action varchar(20) NOT NULL,
--     old_value jsonb,
--     new_value jsonb,
--     changes jsonb,
--     user_id varchar(100),
--     user_email varchar(255),
--     ip_address varchar(45),
--     user_agent text,
--     metadata jsonb,
--     created_at timestamp with time zone NOT NULL DEFAULT NOW(),
--     PRIMARY KEY (id, created_at)
-- ) PARTITION BY RANGE (created_at);

-- Step 2: Create monthly partitions
-- Create partitions for current and next 12 months

-- Example for 2025
-- CREATE TABLE audit_logs_2025_01 PARTITION OF audit_logs_new
--     FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- CREATE TABLE audit_logs_2025_02 PARTITION OF audit_logs_new
--     FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

-- ... (continue for all months)

-- Step 3: Create indexes on partitions
-- CREATE INDEX idx_audit_logs_2025_01_entity ON audit_logs_2025_01(entity_name, created_at);
-- CREATE INDEX idx_audit_logs_2025_01_entity_id ON audit_logs_2025_01(entity_id, created_at);
-- CREATE INDEX idx_audit_logs_2025_01_user_id ON audit_logs_2025_01(user_id, created_at);

-- Step 4: Automate partition creation
-- Function to create new partitions automatically
CREATE OR REPLACE FUNCTION create_audit_partition()
RETURNS void AS $$
DECLARE
    partition_date date;
    partition_name text;
    start_date date;
    end_date date;
BEGIN
    partition_date := date_trunc('month', NOW() + interval '1 month');
    partition_name := 'audit_logs_' || to_char(partition_date, 'YYYY_MM');
    start_date := partition_date;
    end_date := partition_date + interval '1 month';

    -- Check if partition already exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_class WHERE relname = partition_name
    ) THEN
        EXECUTE format(
            'CREATE TABLE %I PARTITION OF audit_logs FOR VALUES FROM (%L) TO (%L)',
            partition_name, start_date, end_date
        );

        -- Create indexes
        EXECUTE format('CREATE INDEX %I ON %I(entity_name, created_at)',
            partition_name || '_entity_idx', partition_name);
        EXECUTE format('CREATE INDEX %I ON %I(entity_id, created_at)',
            partition_name || '_entity_id_idx', partition_name);
        EXECUTE format('CREATE INDEX %I ON %I(user_id, created_at)',
            partition_name || '_user_id_idx', partition_name);

        RAISE NOTICE 'Created partition: %', partition_name;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Schedule monthly partition creation (using pg_cron or application)
-- If using pg_cron:
-- SELECT cron.schedule('create-audit-partition', '0 0 1 * *', 'SELECT create_audit_partition()');

-- =====================================================
-- Performance Benefits:
-- =====================================================
-- 1. Query performance: Only scan relevant time partitions
-- 2. Maintenance: Drop old partitions easily
-- 3. Archival: Move old partitions to cheaper storage
-- 4. Index size: Smaller indexes per partition
-- 5. Vacuum: Faster vacuum on smaller partitions
