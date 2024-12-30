import { z } from 'zod';
import type { Dto } from './type-utils';

export const categorySchema = z.object({
    name: z.string(),
    color: z.string().optional(),
    icon: z.string().optional(),
});

export const categoryFormSchema = categorySchema.extend({
    name: z.string().min(2, 'Podaj nazwę kategorii'),
    color: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, 'Podaj kolor w formacie HEX')
        .optional()
        .or(z.literal('')),
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryFormData = z.infer<typeof categoryFormSchema>;

// QUERY MODELS
export type CategoryDto = Dto<Category>;
export type CategoryWithFrequency = Pretty<CategoryDto & { frequency: number }>;
