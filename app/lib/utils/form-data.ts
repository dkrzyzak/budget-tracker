import { z } from 'zod';

export function toFormData(object: Record<string, any>) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(object)) {
        formData.append(key, value);
    }

    return formData;
}

export function preprocessNull<S extends z.ZodTypeAny>(schema: S) {
    return z.preprocess((val) => (!val || val === 'null' ? null : val), schema);
}
