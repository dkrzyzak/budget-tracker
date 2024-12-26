import { db } from '~/db/connection.server';
import type { CategoryDto } from '~/db/models';

export type CreateCategoryData = { id?: number };

export async function addCategory(categoryName: string) {
    const res = await db.insert({ name: categoryName }).into<CategoryDto>('categories').returning('id');

    return res;
}
