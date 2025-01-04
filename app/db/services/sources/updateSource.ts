import { db } from '~/db/connection.server';
import type { SourceDto, SourceFormData } from '~/db/models';

export async function updateSource(source: SourceFormData) {
    const res = await db<SourceDto>('sources')
        .where('id', '=', source.id)
        .update({
            name: source.name,
            image: source.image || null,
        });

    return res;
}
