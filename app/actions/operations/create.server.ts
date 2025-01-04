import { operationFormParser } from '~/db/models';
import { addCategory } from '~/db/services/categories';
import { addOperation } from '~/db/services/operations';
import { addSource } from '~/db/services/sources';
import { NEW_OPTION_ID } from '~/lib/globals';
import { promised } from '~/lib/utils/promised';

export const createOperation: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const dataAsObject = Object.fromEntries(formData.entries());
    const parsedForm = operationFormParser.safeParse(dataAsObject);

    if (!parsedForm.success) {
        return { success: false, message: 'Podano nieprawidłowe dane' };
    }

    const { data } = parsedForm;

    let categoryId = data.categoryId;

    // if category is new, insert it into the db
    if (data.categoryId === NEW_OPTION_ID) {
        const [newCategory, error] = await promised(addCategory, {
            name: data.categoryName,
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

    let sourceId = data.sourceId;

    // if category is new, insert it into the db
    if (data.sourceId === NEW_OPTION_ID) {
        const [newSource, error] = await promised(addSource, {
            id: null,
            name: data.categoryName,
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

    const [_changedRows, error] = await promised(addOperation, {
        ...data,
        sourceId,
        categoryId,
    });

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas dodawania nowej operacji. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Dodano nowy wpis!' };
};
