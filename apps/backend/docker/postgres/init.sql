-- PostgreSQL initialization script
-- This script runs when the database is first created

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create additional schemas if needed
-- CREATE SCHEMA IF NOT EXISTS audit;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE cartop_v3 TO postgres;

-- Log initialization
DO $$
BEGIN
  RAISE NOTICE 'Database initialized successfully at %', NOW();
END $$;
