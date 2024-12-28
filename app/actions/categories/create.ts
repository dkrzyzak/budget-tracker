import { addCategory, type CreateCategoryData } from '~/db/services/categories';
import { promised } from '~/lib/utils/promised';

export const createCategory: ActionFunction<CreateCategoryData> = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('categoryName') as string | null;

    if (!name?.trim()) {
        return {
            success: false,
            message: 'Missing or empty "categoryName" parameter in form data',
        };
    }
    const [data, error] = await promised(addCategory, name.trim());

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas dodawania nowej kategorii. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, id: data[0].id };
};
