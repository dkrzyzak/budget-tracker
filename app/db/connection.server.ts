import pg from 'pg';
const { Pool } = pg;

export const db = new Pool({
    max: 5,
    connectionString: process.env.POSTGRES_URL,
    connectionTimeoutMillis: 2000,
});
