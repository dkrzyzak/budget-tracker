import { z } from 'zod';

export const sourceSchema = z.object({
    name: z.string(),
    image: z.string().optional(),
})

export type Source = z.infer<typeof sourceSchema>;
