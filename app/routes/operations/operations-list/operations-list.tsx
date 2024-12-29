import { useLoaderData } from 'react-router';
import type { LoaderData } from '../index';
import OperationItem from './operation-item';

function OperationsList() {
    const { operations } = useLoaderData<LoaderData>();

    return (
        <div className='grid gap-4'>
            {operations.map((operation) => (
                <OperationItem key={operation.id} operation={operation} />
            ))}
        </div>
    );
}

export default OperationsList;
