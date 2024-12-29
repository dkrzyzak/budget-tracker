import type { QueryResult } from 'pg';
import { db } from '~/db/connection.server';
import type { OperationDto } from '~/db/models';

export type OperationExtended = OperationDto & {
    categoryName: string;
    sourceName: string;
};

export async function getOperations() {
    const data = await db.raw<QueryResult<OperationExtended>>(`
        SELECT
            o.*, -- all columns from operations
            c.name as "categoryName",
            s.name as "sourceName"
        FROM "operations" o
        INNER JOIN "categories" c ON c.id = o."categoryId"
        INNER JOIN "sources" s ON s.id = o."sourceId"
        ORDER BY o."operationDate" ASC;
    `);

    return data.rows;
}
