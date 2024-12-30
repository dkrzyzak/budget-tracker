import { db } from '~/db/connection.server';
import type { CategoryDto } from '~/db/models';

export async function deleteCategory(categoryId: string) {
    const res = await db.delete().from<CategoryDto>('categories').where('id', '=', categoryId);
    console.log(res);
    return res;
}
