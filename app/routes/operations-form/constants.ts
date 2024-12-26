import type { Operation } from '~/db/models';
import { UNSELECTED_ID } from '~/lib/globals';

export const initialData: Operation = {
    type: 'expense',
    amount: undefined as unknown as number,
    categoryId: UNSELECTED_ID,
    operationDate: new Date(),
    name: '',
    sourceId: UNSELECTED_ID,
};
