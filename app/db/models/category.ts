import { z } from 'zod';
import { preprocessNull, preprocessNumber } from '~/lib/utils/zodHelpers';

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string().nullable(),
    icon: z.string().nullable(),
});

export const categoryFormSchema = categorySchema.extend({
    id: preprocessNumber(preprocessNull(z.number().nullable())),
    name: z.string().min(2, 'Podaj nazwę kategorii'),
    color: preprocessNull(
        z
            .string()
            .regex(/^#[0-9a-fA-F]{6}$/, 'Podaj kolor w formacie HEX')
            .nullable()
    ),
    icon: preprocessNull(z.string().nullable()),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

// QUERY MODELS
export type CategoryDto = z.infer<typeof categorySchema>;
export type CategoryWithFrequency = Pretty<CategoryDto & { frequency: number }>;
