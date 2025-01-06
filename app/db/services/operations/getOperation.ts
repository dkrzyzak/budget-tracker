import type { QueryResult } from 'pg';
import { db } from '~/db/connection.server';
import type { OperationDto } from '~/db/models';

export type OperationExtended = OperationDto & {
    categoryName: string;
    categoryColor: string | null;
    categoryIcon: string | null;
    sourceName: string;
};

export async function getOperations() {
    const data = await db.raw<QueryResult<OperationExtended>>(`
        SELECT
            o.*, -- all columns from operations
            c.name as "categoryName",
            c.color as "categoryColor",
            c.icon as "categoryIcon",
            s.name as "sourceName"
        FROM "operations" o
        INNER JOIN "categories" c ON c.id = o."categoryId"
        INNER JOIN "sources" s ON s.id = o."sourceId"
        ORDER BY o."operationDate" ASC;
    `);

    return data.rows;
}
