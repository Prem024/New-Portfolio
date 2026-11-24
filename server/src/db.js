import pg from 'pg';

const { Pool } = pg;

/**
 * Create a PostgreSQL connection pool from DATABASE_URL.
 * Enables SSL automatically for remote hosts (e.g., Supabase, Neon, Render)
 * unless explicitly disabled in the connection string.
 */
export function createPool(connectionString = process.env.DATABASE_URL) {
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL environment variable is missing. Configure it in server/.env.'
    );
  }

  const isLocal =
    connectionString.includes('localhost') ||
    connectionString.includes('127.0.0.1');
  const sslDisabled = connectionString.includes('sslmode=disable');

  return new Pool({
    connectionString,
    ssl: isLocal || sslDisabled ? false : { rejectUnauthorized: false },
  });
}

export const CREATE_MESSAGES_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
    ON contact_messages (created_at DESC);
`;

/**
 * Ensure required database tables and indexes exist on startup.
 */
export async function initDb(pool) {
  await pool.query(CREATE_MESSAGES_TABLE_SQL);
}
