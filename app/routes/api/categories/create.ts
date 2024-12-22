import type { ActionFunction, ShouldRevalidateFunctionArgs } from 'react-router';
import { addCategory } from '~/db/services/categories';
import { createResponse } from '~/lib/utils';
import { promised } from '~/lib/utils/promised';

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('categoryName') as string | null;

    if (!name) {
        throw createResponse(400, {
            success: false,
            message: 'Missing "categoryName" parameter in form data',
        });
    }
    const [_, error] = await promised(addCategory, name);

    if (error) {
        throw createResponse(500, {
            success: false,
            message: `Wystąpił problem podczas dodawania nowej kategorii. Komunikat błędu: ${error.message}`,
        });
    }

    return createResponse(201, { success: true });
};

export function shouldRevalidate(arg: ShouldRevalidateFunctionArgs) {
    console.log('in action route', arg);
    return true;
}
