import type { CreateOperationFormData } from '~/db/models';
import { UNSELECTED_ID } from '~/lib/globals';

export const initialData: CreateOperationFormData = {
    type: 'expense',
    name: '',
    amount: '',
    operationDate: new Date(),
    categoryId: UNSELECTED_ID,
    categoryName: '',
    sourceId: UNSELECTED_ID,
    sourceName: '',
};
