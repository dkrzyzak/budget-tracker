import type { Operation } from '~/db/models';

export const NEW_OPTION_ID = -2;

export const initialData: Operation = {
    type: 'expense',
    amount: 0,
    categoryId: -1,
    operationDate: new Date(),
    name: '',
    sourceId: -1,
};
