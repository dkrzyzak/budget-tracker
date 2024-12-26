import { z } from 'zod';
import type { Dto } from './type-utils';

export const operationSchema = z.object({
    type: z.enum(['expense', 'income']),
    name: z.string().optional(),
    amount: z.string().transform((val, ctx) => {
        // Handle empty string case
        if (val === '') return 0;

        // Parse string to number
        const parsed = Number(val.replace(',', '.'));

        // Return undefined if parsing failed
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Wprowadź wartość liczbową',
            });
            return z.NEVER;
        }

        return parsed;
    }),
    operationDate: z.date(),
    sourceId: z.number(), // from whom received or to whom passed
    categoryId: z.number(), // it will be taken from API
});

export type Operation = z.infer<typeof operationSchema>;
export type OperationDto = Dto<Operation>;

export type OperationType = Operation['type'];
