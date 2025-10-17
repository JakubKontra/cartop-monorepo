const { Client } = require('pg');

async function fixDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'cartop_v3',
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Drop specific problematic index
    const dropIndexSQL = `DROP INDEX IF EXISTS "IDX_ce43d4de365a7e21cbb4f1b405";`;
    await client.query(dropIndexSQL);
    console.log('Dropped index IDX_ce43d4de365a7e21cbb4f1b405');

    // List all indexes that start with IDX_
    const listAllIndexesSQL = `
      SELECT tablename, indexname
      FROM pg_indexes
      WHERE schemaname = 'public' AND indexname LIKE 'IDX%';
    `;
    const result = await client.query(listAllIndexesSQL);
    console.log('All IDX_ indexes:', result.rows);

    console.log('Database cleanup completed successfully');
  } catch (error) {
    console.error('Error fixing database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixDatabase();
