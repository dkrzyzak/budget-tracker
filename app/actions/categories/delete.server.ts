import { deleteCategory } from '~/db/services/categories';
import { promised } from '~/lib/utils/promised';

export const deleteCategoryAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const categoryId = formData.get('categoryId');

    if (!categoryId || typeof categoryId !== 'string') {
        console.log('categoryId: ', categoryId);
        return { success: false, message: 'Przekazano złe dane' };
    }

    const [_changedRows, error] = await promised(deleteCategory, categoryId);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas usuwania kategorii. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Pomyślnie usunięto kategorię' };
};
