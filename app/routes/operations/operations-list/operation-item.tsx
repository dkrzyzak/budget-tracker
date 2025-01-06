import type { OperationExtended } from '~/db/services/operations';
import { formatDefault } from '~/lib/utils/date';

interface OperationItemProps {
    operation: OperationExtended;
}

function OperationItem({ operation }: OperationItemProps) {
    return (
        <div className='grid'>
            <p>{operation.name}</p>
            <p>
                {operation.type === 'expense'
                    ? `-${operation.amount} zł`
                    : `+${operation.amount} zł`}
            </p>
            <p>{formatDefault(operation.operationDate)}</p>
            <p>{operation.categoryName}</p>
            <p>{operation.sourceName}</p>
        </div>
    );
}

export default OperationItem;
