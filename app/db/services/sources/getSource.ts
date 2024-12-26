import type { QueryResult } from 'pg';
import { db } from '~/db/connection.server';
import type { SourceDto, SourceWithFrequency } from '~/db/models';

export async function getSources() {
    const data = await db.select('*').from<SourceDto>('categories');

    return data;
}

export async function getSourcesByFrequency() {
    const data = await db.raw<QueryResult<SourceWithFrequency>>(`
        SELECT s.id, s.name, s.image, COUNT(o.id)::INTEGER as "frequency"
        FROM "sources" s
        LEFT JOIN "operations" o ON s.id = o."sourceId"
        GROUP BY s.id, s.name, s.image
        ORDER BY "frequency" DESC;
    `);

    return data.rows;
}
