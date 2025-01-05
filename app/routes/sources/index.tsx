import { type MetaFunction } from 'react-router';
import { getSourcesByFrequency } from '~/db/services/sources';
import { SourcesList } from './sources-list/sources-list';
import { createSourceAction } from '~/actions/sources/create.server';
import { deleteSourceAction } from '~/actions/sources/delete.server';
import { updateSourceAction } from '~/actions/sources/update.server';

export const meta: MetaFunction = () => {
    return [{ title: 'Źródła | Billans' }];
};

export const loader = async () => {
    const sources = await getSourcesByFrequency();

    return { sources };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export const action: ActionFunction = (args) => {
    const method = args.request.method;

    switch (method) {
        case 'POST': {
            return createSourceAction(args);
        }
        case 'PUT': {
            return updateSourceAction(args);
        }
        case 'DELETE': {
            return deleteSourceAction(args);
        }
    }

    return Promise.resolve({ success: false, message: 'Tej metody nie obsługujemy' });
};

export default function SourcesPage() {
    return (
        <div className='grid my-16'>
            <h1 className='text-3xl mb-12'>Źródła</h1>
            <SourcesList />
        </div>
    );
}
