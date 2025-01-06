import { db } from '~/db/connection.server';
import type { OperationDto, OperationFormData } from '~/db/models';

export async function updateOperation(operation: OperationFormData) {
    const res = await db<OperationDto>('operations')
        .where('id', '=', operation.id)
        .update({
            amount: operation.amount,
            categoryId: operation.categoryId,
            // TODO: rozkminić czy by tego już nie transformować do tej postaci po stronie frontu
            name: operation.name || `${operation.categoryName} - ${operation.sourceName}`,
            operationDate: operation.operationDate,
            sourceId: operation.sourceId,
            type: operation.type,
        });

    return res;
}
