import { operationFormSchema } from '~/db/models';
import { addCategory } from '~/db/services/categories';
import { updateOperation } from '~/db/services/operations';
import { addSource } from '~/db/services/sources';
import { NEW_OPTION_ID } from '~/lib/globals';
import { promised } from '~/lib/utils/promised';

export const updateOperationAction: ActionFunction = async ({ request }) => {
    const formDataObject = Object.fromEntries((await request.formData()).entries());
    const parsedForm = operationFormSchema.safeParse(formDataObject);

    if (!parsedForm.success) {
        console.log('errors: ', parsedForm.error.issues);
        return { success: false, message: 'Przekazano złe dane' };
    }

    const { data: formData } = parsedForm;

    let categoryId = formData.categoryId;

    // if category is new, insert it into the db
    if (formData.categoryId === NEW_OPTION_ID) {
        // TODO: separate function to add category only with name
        const [newCategory, error] = await promised(addCategory, {
            name: formData.categoryName,
            id: null,
            color: null,
            icon: null,
        });

        if (error) {
            return {
                success: false,
                message:
                    'Nie udało się utworzyć nowej kategorii. Tworzenie wpisu zakończone niepowodzeniem.',
            };
        }

        categoryId = newCategory.id;
    }

    let sourceId = formData.sourceId;

    // if category is new, insert it into the db
    if (formData.sourceId === NEW_OPTION_ID) {
        // TODO: separate function to add source only with name
        const [newSource, error] = await promised(addSource, {
            id: null,
            name: formData.sourceName,
            image: null,
        });

        if (error) {
            return {
                success: false,
                message:
                    'Nie udało się utworzyć nowego źródła. Tworzenie wpisu zakończone niepowodzeniem.',
            };
        }

        sourceId = newSource.id;
    }

    const [_changedRows, error] = await promised(updateOperation, {
        ...formData,
        categoryId,
        sourceId,
    });

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas edytowania operacji. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Zapisano zmiany!' };
};
