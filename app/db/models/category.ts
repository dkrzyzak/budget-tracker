import { z } from 'zod';
import type { Dto } from './type-utils';
import { preprocessNull } from '~/lib/utils/form-data';

export const categorySchema = z.object({
    name: z.string(),
    color: z.string().nullable(),
    icon: z.string().nullable(),
});

export const categoryFormSchema = categorySchema.extend({
    name: z.string().min(2, 'Podaj nazwę kategorii'),
    color: preprocessNull(
        z
            .string()
            .regex(/^#[0-9a-fA-F]{6}$/, 'Podaj kolor w formacie HEX')
            .nullable()
    ),
    icon: preprocessNull(z.string().nullable()),
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryFormData = z.infer<typeof categoryFormSchema>;

// QUERY MODELS
export type CategoryDto = Dto<Category>;
export type CategoryWithFrequency = Pretty<CategoryDto & { frequency: number }>;
