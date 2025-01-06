import { db } from '~/db/connection.server';
import type { OperationDto } from '~/db/models';

export async function deleteOperation(operationId: string) {
    const res = await db
        .delete()
        .from<OperationDto>('operations')
        .where('id', '=', operationId);

    return res;
}
