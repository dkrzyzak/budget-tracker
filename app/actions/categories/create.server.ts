import { categoryFormSchema } from '~/db/models';
import { addCategory } from '~/db/services/categories';
import { promised } from '~/lib/utils/promised';

export const createCategoryAction: ActionFunction = async ({ request }) => {
    const formDataObject = Object.fromEntries((await request.formData()).entries());
    const parsedForm = categoryFormSchema.safeParse(formDataObject);

    if (!parsedForm.success) {
        console.log('errors: ', parsedForm.error.issues);
        return { success: false, message: 'Przekazano złe dane' };
    }

    const { data: formData } = parsedForm;

    if (!formData.name.trim()) {
        return {
            success: false,
            message: 'Pusta nazwa kategorii nie jest dozwolona',
        };
    }

    const [_categoryId, error] = await promised(addCategory, formData);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas dodawania nowej kategorii. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Utworzono nową kategorię!' };
};
