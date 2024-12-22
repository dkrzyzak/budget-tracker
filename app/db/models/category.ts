import { z } from 'zod';
import type { Dto } from './type-utils';

export const categorySchema = z.object({
    name: z.string().min(2),
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    icon: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;

export type CategoryDto = Dto<Category>;
