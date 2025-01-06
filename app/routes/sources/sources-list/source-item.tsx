import { Pencil, Trash } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { useItemsDeletion, useItemsForm } from '~/context/items-manager';
import type { SourceDto } from '~/db/models';

interface SourceItemProps {
    source: SourceDto;
}

function SourceItem({ source }: SourceItemProps) {
    const { editItem } = useItemsForm<SourceDto>();

    // TODO: block deletion if there is an operation that uses this source (and point to that operation)
    // TODO: same for categories
    const { deleteItem } = useItemsDeletion<SourceDto>();

    return (
        <div className='border p-2 flex justify-between gap-4'>
            <div className='flex items-center gap-2 text-xl'>
                <p className=''>{source.name}</p>
            </div>
            <div className='flex gap-2'>
                <Button variant='outline' onClick={() => editItem(source)}>
                    <Pencil />
                </Button>
                <Button variant='destructive' onClick={() => deleteItem(source)}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}

export default SourceItem;
