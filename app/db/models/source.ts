import { z } from 'zod';
import { preprocessNull, preprocessNumber } from '~/lib/utils/zodHelpers';

export const sourceSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable(),
});

export const sourceFormSchema = sourceSchema.extend({
    id: preprocessNumber(preprocessNull(z.number().nullable())),
    name: z.string().min(2, 'Pusta nazwa nie jest dozwolona'),
});


export type SourceFormData = z.infer<typeof sourceFormSchema>;

// QUERY MODELS
export type SourceDto = z.infer<typeof sourceSchema>;
export type SourceWithFrequency = Pretty<SourceDto & { frequency: number }>;
