import { type MetaFunction } from 'react-router';
import { getOperations } from '~/db/services/operations';
import OperationsList from './operations-list/operations-list';
import { promised } from '~/lib/utils';
import { getCategoriesByFrequency } from '~/db/services/categories';
import { getSourcesByFrequency } from '~/db/services/sources';

export const meta: MetaFunction = () => {
    return [{ title: 'Operacje | Billans' }];
};

export const loader = async () => {
    const [operations, operationsError] = await promised(getOperations);
    const [categories, categoriesError] = await promised(getCategoriesByFrequency);
    const [sources, sourcesError] = await promised(getSourcesByFrequency);

    return {
        operations: operationsError ? [] : operations,
        categories: categoriesError ? [] : categories,
        sources: sourcesError ? [] : sources,
    };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function OperationsPage() {
    return (
        <div className='grid'>
            <h1 className='text-3xl mb-12'>Operacje</h1>
            <OperationsList />
        </div>
    );
}
