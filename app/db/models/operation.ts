import { z } from 'zod';
import type { Dto } from './type-utils';
import { UNSELECTED_ID } from '~/lib/globals';
import { stripTimeZone } from '~/lib/utils/date';

// clean mapping for a Postgres table
export const operationSchema = z.object({
    type: z.enum(['expense', 'income']),
    name: z.string().optional(),
    amount: z.string(), // DECIMAL is "100.00"
    operationDate: z.date(),
    categoryId: z.number(),
    sourceId: z.number(),
});


export const operationFormSchema = operationSchema.extend({
    categoryName: z.string().min(1, 'Pusta nazwa kategorii'), // NOTE: new field
    sourceName: z.string().min(1, 'Pusta nazwa źródła'), // NOTE: new field

    amount: z
        .string()
        .min(1, 'Podaj kwotę')
        .regex(/^\d+([.,]\d{1,2})?$/, 'Podaj liczbę'),

    operationDate: z.union([z.date(), z.string().transform((date) => new Date(date))]),

    categoryId: z
        .union([z.number(), z.string().transform((str) => parseInt(str))])
        .refine((categoryId) => categoryId !== UNSELECTED_ID, {
            message: 'Wybierz kategorię',
        }),

    sourceId: z
        .union([z.number(), z.string().transform((str) => parseInt(str))])
        .refine((sourceId) => sourceId !== UNSELECTED_ID, {
            message: 'Wybierz źródło',
        }),
});

export const operationFormParser = operationFormSchema.transform((data) => {
    return {
        ...data,
        amount: parseFloat(data.amount.replace(',', '.')),
        operationDate: stripTimeZone(data.operationDate).toISOString(),
    };
});

export type Operation = z.infer<typeof operationSchema>;
export type OperationFormData = z.infer<typeof operationFormSchema>;
export type OperationFormDataParsed = z.infer<typeof operationFormParser>;

export type OperationDto = Dto<Operation>;
export type OperationType = Operation['type'];
