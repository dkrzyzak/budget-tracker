import { type MetaFunction } from 'react-router';
import { getOperations } from '~/db/services/operations';
import OperationsList from './operations-list/operations-list';
import { promised } from '~/lib/utils';
import { getCategoriesByFrequency } from '~/db/services/categories';
import { getSourcesByFrequency } from '~/db/services/sources';
import { createOperationAction } from '~/actions/operations/create.server';
import { deleteOperationAction } from '~/actions/operations/delete.server';
import { updateOperationAction } from '~/actions/operations/update.server';

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

export const action: ActionFunction = (args) => {
    const method = args.request.method;

    switch (method) {
        case 'POST': {
            return createOperationAction(args);
        }

        case 'PUT': {
            return updateOperationAction(args);
        }

        case 'DELETE': {
            return deleteOperationAction(args);
        }

        default: {
            return Promise.resolve({ success: false, message: `Nie obsługujemy tej metody: ${method}}` })
        }
    } 
}

export default function OperationsPage() {
    return (
        <div className='grid'>
            <h1 className='text-3xl mb-12'>Operacje</h1>
            <OperationsList />
        </div>
    );
}
