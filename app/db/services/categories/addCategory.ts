import { db } from '~/db/connection.server';

export async function addCategory(categoryName: string) {
    const res = await db.insert({ name: categoryName }).into('categories');

    return res;
}
