import { db } from '~/db/connection.server';
import type { SourceDto } from '~/db/models';

export async function deleteSource(sourceId: string) {
    console.log('deleting ', sourceId);

    const res = await db
        .delete()
        .from<SourceDto>('sources')
        .where('id', '=', sourceId);

    return res;
}
