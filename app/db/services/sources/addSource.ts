import { db } from '~/db/connection.server';
import type { SourceDto } from '~/db/models';

export async function addSource(sourceName: string) {
    const res = await db
        .insert({ name: sourceName })
        .into<SourceDto>('sources')
        .returning('id');

    return res[0];
}
