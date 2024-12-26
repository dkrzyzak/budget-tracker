import type { QueryResult } from 'pg';
import { db } from '~/db/connection.server';
import type { CategoryDto, CategoryWithUsage } from '~/db/models';

export async function getCategories() {
    const data = await db.select('*').from<CategoryDto>('categories');

    return data;
}

export async function getCategoriesByUsage() {
    const data = await db.raw<QueryResult<CategoryWithUsage>>(`
        SELECT c.id, c.name, c.color, c.icon, COUNT(o.id)::INTEGER as "operationsCount"
        FROM "categories" c
        LEFT JOIN "operations" o ON c.id = o."categoryId"
        GROUP BY c.id, c.name, c.color, c.icon
        ORDER BY "operationsCount" DESC;
    `);

    return data.rows;
}
