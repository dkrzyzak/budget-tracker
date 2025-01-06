import { z } from 'zod';
import { UNSELECTED_ID } from '~/lib/globals';
import { stripTimeZone } from '~/lib/utils/date';
import { preprocessNull, preprocessNumber } from '~/lib/utils/zodHelpers';

// clean mapping for a Postgres table
export const operationSchema = z.object({
    id: z.number(),
    type: z.enum(['expense', 'income']),
    name: z.string().optional(),
    amount: z.string(), // DECIMAL is "100.00"
    operationDate: z.date(),
    categoryId: z.number(),
    sourceId: z.number(),
});

export const operationFormSchema = operationSchema.extend({
    id: preprocessNumber(preprocessNull(z.number().nullable())),
    categoryName: z.string().min(1, 'Pusta nazwa kategorii'), // NOTE: new field
    sourceName: z.string().min(1, 'Pusta nazwa źródła'), // NOTE: new field

    amount: z
        .string()
        .min(1, 'Podaj kwotę')
        .regex(/^\d+([.,]\d{1,2})?$/, 'Podaj liczbę'),

    operationDate: z.union([z.date(), z.string().transform((date) => new Date(date))]),

    categoryId: preprocessNumber(z.number()).refine(
        (categoryId) => categoryId !== UNSELECTED_ID,
        {
            message: 'Wybierz kategorię',
        }
    ),

    sourceId: preprocessNumber(z.number()).refine(
        (sourceId) => sourceId !== UNSELECTED_ID,
        {
            message: 'Wybierz źródło',
        }
    ),
});

export const operationFormParser = operationFormSchema.transform((data) => {
    return {
        ...data,
        amount: parseFloat(data.amount.replace(',', '.')),
        operationDate: stripTimeZone(data.operationDate).toISOString(),
    };
});

export type OperationFormData = z.infer<typeof operationFormSchema>;
export type OperationFormDataParsed = z.infer<typeof operationFormParser>;

export type OperationDto = z.infer<typeof operationSchema>;
export type OperationType = OperationDto['type'];
