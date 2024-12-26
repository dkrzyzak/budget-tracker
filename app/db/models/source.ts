import { z } from 'zod';
import type { Dto } from './type-utils';

export const sourceSchema = z.object({
    name: z.string(),
    image: z.string().optional(),
});

export type Source = z.infer<typeof sourceSchema>;

// QUERY MODELS
export type SourceDto = Dto<Source>;
export type SourceWithFrequency = Pretty<SourceDto & { frequency: number }>;
