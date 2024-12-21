import { z } from 'zod';

export const operationSchema = z.object({
    type: z.enum(['expense', 'income']),
    name: z.string().optional(),
    amount: z.number(),
    operationDate: z.date(),
    sourceId: z.number(), // from whom received or to whom passed
    categoryId: z.number(), // it will be taken from API
});

export type Operation = z.infer<typeof operationSchema>;
export type OperationType = Operation['type'];
