import { z } from 'zod';

export const operationFormSchema = z.object({
    type: z.enum(['expense', 'income']),
    name: z.string(),
    amount: z.number(),
    category: z.string(), // it will be taken from API
    date: z.date(),
    source: z.string(), // from whom received or to whom passed
});

export type OperationFormData = z.infer<typeof operationFormSchema>;
export type OperationType = OperationFormData['type'];

export const initialData: OperationFormData = {
    type: 'expense',
    amount: 0,
    category: '',
    date: new Date(),
    name: '',
    source: '',
};
