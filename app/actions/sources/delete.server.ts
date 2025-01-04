import { deleteSource } from '~/db/services/sources';
import { promised } from '~/lib/utils/promised';

export const deleteSourceAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const sourceId = formData.get('sourceId');

    if (!sourceId || typeof sourceId !== 'string') {
        return { success: false, message: 'Przekazano złe dane' };
    }

    const [_changedRows, error] = await promised(deleteSource, sourceId);

    if (error) {
        return {
            success: false,
            message: `Wystąpił problem podczas usuwania źródła. Komunikat błędu: ${error.message}`,
        };
    }

    return { success: true, message: 'Pomyślnie usunięto źródło' };
};
