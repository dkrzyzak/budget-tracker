import { z } from 'zod';

export const sourceSchema = z.object({
    name: z.string(),
})

export type Source = z.infer<typeof sourceSchema>;
