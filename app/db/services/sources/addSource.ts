import { db } from '~/db/connection.server';
import type { SourceDto, SourceFormData } from '~/db/models';

export async function addSource(source: SourceFormData) {
    const res = await db
        .insert({ name: source.name, image: source.image || null })
        .into<SourceDto>('sources')
        .returning('id');

    return res[0];
}

export async function addSourceByName(sourceName: string) {
    const res = await db
        .insert({
            name: sourceName,
        })
        .into<SourceDto>('sources')
        .returning('id');

    return res[0];
}
