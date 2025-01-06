import { Pencil, Trash } from 'lucide-react';
import SvgIcon from '~/components/icon';
import { Button } from '~/components/ui/button';
import { useItemsDeletion, useItemsForm } from '~/context/items-manager';
import type { OperationDto } from '~/db/models';
import type { OperationExtended } from '~/db/services/operations';
import { formatDefault } from '~/lib/utils/date';

interface OperationItemProps {
    operation: OperationExtended;
}

function OperationItem({ operation }: OperationItemProps) {
    const { editItem } = useItemsForm<OperationDto>();
    const { deleteItem } = useItemsDeletion<OperationDto>();

    return (
        <div className='border p-2 flex justify-between gap-4'>
            <div className='flex items-center gap-2 text-xl'>
                {operation.categoryIcon && (
                    <SvgIcon
                        svgSource={operation.categoryIcon}
                        color={operation.categoryColor}
                    />
                )}
                <div>
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
            </div>
            <div className='flex gap-2'>
                <Button variant='outline' onClick={() => editItem(operation)}>
                    <Pencil />
                </Button>
                <Button variant='destructive' onClick={() => deleteItem(operation)}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}

export default OperationItem;
