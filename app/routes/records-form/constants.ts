import { z } from 'zod';

export const recordFormSchema = z.object({
    type: z.enum(['expense', 'income']),
    name: z.string(),
    amount: z.number(),
    category: z.string(), // it will be taken from API
    date: z.date(),
    source: z.string(), // from whom received or to whom passed
});

export type RecordFormData = z.infer<typeof recordFormSchema>;
export type RecordType = RecordFormData['type'];

export const initialData: RecordFormData = {
    type: 'expense',
    amount: 0,
    category: '',
    date: new Date(),
    name: '',
    source: '',
};
