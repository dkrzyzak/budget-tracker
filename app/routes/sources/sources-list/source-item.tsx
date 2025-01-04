import type { SourceDto } from '~/db/models';
import { Button } from '~/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useSourceManagement } from './source-management-context';

interface SourceItemProps {
    source: SourceDto;
}

function SourceItem({ source }: SourceItemProps) {
    const { editSource, deleteSource } = useSourceManagement();

    return (
        <div className='border p-2 flex justify-between gap-4'>
            <div className='flex items-center gap-2 text-xl'>
                <p className=''>{source.name}</p>
            </div>
            <div className='flex gap-2'>
                <Button variant='outline' onClick={() => editSource(source)}>
                    <Pencil />
                </Button>
                <Button variant='destructive' onClick={() => deleteSource(source)}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}

export default SourceItem;
