import { z } from 'zod';

export function preprocessNull<S extends z.ZodTypeAny>(schema: S) {
    return z.preprocess((val) => (!val || val === 'null' ? null : val), schema);
}

export function preprocessNumber<S extends z.ZodTypeAny>(schema: S) {
    return z.preprocess((val) => (typeof val === 'string' ? parseInt(val) : val), schema);
}
