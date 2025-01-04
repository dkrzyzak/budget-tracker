import { sourceFormSchema } from '~/db/models';
import { addSource } from '~/db/services/sources';
import { promised } from '~/lib/utils/promised';

export const createSourceAction: ActionFunction = async ({ request }) => {
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

    const [_sourceId, error] = await promised(addSource, formData);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas dodawania nowego źródła. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Utworzono nowe źródło!' };
};
