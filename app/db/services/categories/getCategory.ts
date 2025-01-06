import type { QueryResult } from 'pg';
import { db } from '~/db/connection.server';
import type { CategoryDto, CategoryWithFrequency } from '~/db/models';

export async function getCategories() {
    const data = await db.select('*').from<CategoryDto>('categories');

    return data;
}

export async function getCategoriesByFrequency() {
    const data = await db.raw<QueryResult<CategoryWithFrequency>>(`
        SELECT c.id, c.name, c.color, c.icon, COUNT(o.id)::INTEGER as "frequency"
        FROM "categories" c
        LEFT JOIN "operations" o ON c.id = o."categoryId"
        GROUP BY c.id, c.name, c.color, c.icon
        ORDER BY "frequency" DESC, c.name ASC;
    `);

    return data.rows;
}
