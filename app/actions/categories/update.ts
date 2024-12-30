import { categoryFormSchema } from '~/db/models';
import { updateCategory } from '~/db/services/categories';
import { promised } from '~/lib/utils/promised';

export const updateCategoryAction: ActionFunction = async ({ request }) => {
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

    const [_, error] = await promised(updateCategory, formData);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas edytowania kategorii. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true };
};
