import type { QueryResult } from 'pg';
import { db } from '~/db/connection.server';
import type { OperationDto } from '~/db/models';

export type OperationExtended = Pick<
    OperationDto,
    'id' | 'type' | 'name' | 'amount' | 'operationDate'
> & {
    categoryName: string;
    sourceName: string;
};

export async function getOperations() {
    const data = await db.raw<QueryResult<OperationExtended>>(`
        SELECT
            o."id",
            o."type",
            o."name",
            o."amount",
            o."operationDate",
            c.name as "categoryName",
            s.name as "sourceName"
        FROM "operations" o
        INNER JOIN "categories" c ON c.id = o."categoryId"
        INNER JOIN "sources" s ON s.id = o."sourceId";
    `);

    return data.rows;
}
