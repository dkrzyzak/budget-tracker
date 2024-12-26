import type { Operation } from '~/db/models';

export const NEW_OPTION_ID = -2;

export const initialData: Operation = {
    type: 'expense',
    amount: undefined as unknown as number,
    categoryId: -1,
    operationDate: new Date(),
    name: '',
    sourceId: -1,
};
