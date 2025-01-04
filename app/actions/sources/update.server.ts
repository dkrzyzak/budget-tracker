import { sourceFormSchema } from '~/db/models';
import { updateSource } from '~/db/services/sources';
import { promised } from '~/lib/utils/promised';

export const updateSourceAction: ActionFunction = async ({ request }) => {
    const formDataObject = Object.fromEntries((await request.formData()).entries());
    const parsedForm = sourceFormSchema.safeParse(formDataObject);

    if (!parsedForm.success) {
        console.log('errors: ', parsedForm.error.issues);
        return { success: false, message: 'Przekazano złe dane' };
    }

    const { data: formData } = parsedForm;

    if (!formData.name.trim()) {
        return {
            success: false,
            message: 'Pusta nazwa źródła nie jest dozwolona',
        };
    }

    const [_changedRows, error] = await promised(updateSource, formData);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas edytowania źródła. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Zapisano zmiany!' };
};
