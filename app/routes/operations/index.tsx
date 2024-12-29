import { type MetaFunction } from 'react-router';
import { getOperations } from '~/db/services/operations';
import OperationsList from './operations-list/operations-list';

export const meta: MetaFunction = () => {
    return [{ title: 'Operacje | Billans' }];
};

export const loader = async () => {
    const operations = await getOperations();

    return { operations };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function OperationsPage() {
    return (
        <div className='grid'>
            <h1>Operacje</h1>
            <OperationsList />
        </div>
    );
}
