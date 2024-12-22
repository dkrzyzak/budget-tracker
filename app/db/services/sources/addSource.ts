import { db } from '~/db/connection.server';

export async function addSource(sourceName: string) {
    const res = await db.insert({ name: sourceName }).into('sources');

    return res;
}
