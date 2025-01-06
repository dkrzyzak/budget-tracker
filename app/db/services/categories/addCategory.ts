import { db } from '~/db/connection.server';
import type { CategoryDto, CategoryFormData } from '~/db/models';

export async function addCategory(category: CategoryFormData) {
    const res = await db
        .insert({
            name: category.name,
            icon: category.icon || null,
            color: category.color || null,
        })
        .into<CategoryDto>('categories')
        .returning('id');

    return res[0];
}

export async function addCategoryByName(categoryName: string) {
    const res = await db
        .insert({
            name: categoryName,
        })
        .into<CategoryDto>('categories')
        .returning('id');

    return res[0];
}
