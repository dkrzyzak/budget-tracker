import { Pool } from 'pg';

export const db = new Pool({
    max: 5,
    connectionString: '',
    connectionTimeoutMillis: 2000,
});
