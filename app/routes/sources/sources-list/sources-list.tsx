import { useLoaderData } from 'react-router';
import type { LoaderData } from '../index';
import SourceItem from './source-item';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { useSourceManagement } from './source-management-context';

function SourcesList() {
    const { sources } = useLoaderData<LoaderData>();
    const { createSource } = useSourceManagement();

    return (
        <div className='grid gap-2'>
            {sources.map((source) => (
                <SourceItem key={source.id} source={source} />
            ))}

            <Button onClick={createSource}>
                <Plus />
                Nowe
            </Button>
        </div>
    );
}

export default SourcesList;
