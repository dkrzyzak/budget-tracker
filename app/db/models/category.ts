import { z } from 'zod';

export const categorySchema = z.object({
    name: z.string().min(2),
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    icon: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
