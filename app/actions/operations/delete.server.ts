import { deleteOperation } from '~/db/services/operations';
import { promised } from '~/lib/utils/promised';

export const deleteOperationAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const operationId = formData.get('operationId');

    if (!operationId || typeof operationId !== 'string') {
        console.log('operationId: ', operationId);
        return { success: false, message: 'Przekazano złe dane' };
    }

    const [_changedRows, error] = await promised(deleteOperation, operationId);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas usuwania operacji. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Pomyślnie usunięto operację' };
};
