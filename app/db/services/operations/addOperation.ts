import { db } from '~/db/connection.server';
import type { OperationDto, OperationFormDataParsed } from '~/db/models';

export async function addOperation(operation: OperationFormDataParsed) {
    const res = await db
        .insert({
            type: operation.type,
            amount: operation.amount,
            operationDate: operation.operationDate,
            categoryId: operation.categoryId,
            sourceId: operation.sourceId,
            name: operation.name ?? `${operation.categoryName} - ${operation.sourceName}`,
        })
        .into<OperationDto>('operations');

    return res;
}
