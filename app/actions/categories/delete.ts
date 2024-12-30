import { deleteCategory } from '~/db/services/categories';
import { promised } from '~/lib/utils/promised';

export const deleteCategoryAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const categoryId = formData.get('categoryId');

    if (!categoryId || typeof categoryId !== 'string') {
        return { success: false, message: 'Przekazano złe dane' };
    }


    const [_, error] = await promised(deleteCategory, categoryId);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas usuwania kategorii. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true };
};
