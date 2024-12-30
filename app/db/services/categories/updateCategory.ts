import { db } from '~/db/connection.server';
import type { CategoryDto, CategoryFormData } from '~/db/models';

export async function updateCategory(category: CategoryFormData) {
    const res = await db<CategoryDto>('categories')
        .where('name', '=', category.name)
        .update({
            name: category.name,
            icon: category.icon,
            color: category.color,
        });

    return res;
}
