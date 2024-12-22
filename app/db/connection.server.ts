import knex from 'knex';

export const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },
    pool: {
        min: 1,
        max: 5,
    },
});
