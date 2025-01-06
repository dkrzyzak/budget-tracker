import { type MetaFunction } from 'react-router';

import { createOperation } from '~/actions/operations/create.server';
import { Button } from '~/components/ui/button';
import { getCategoriesByUsage } from '~/db/services/categories';
import { getSourcesByFrequency } from '~/db/services/sources/getSource';
import { promised } from '~/lib/utils';

import OperationsFormTrigger from '../operations-form/operations-form-trigger';

export const meta: MetaFunction = () => {
    return [{ title: 'Strona główna | Billans' }];
};

export const loader = async () => {
    const [categories, categoriesError] = await promised(getCategoriesByUsage);
    const [sources, sourcesError] = await promised(getSourcesByFrequency);

    if (categoriesError) {
        console.log("Couldn't load categories: ", categoriesError);
    }

    if (sourcesError) {
        console.log("Couldn't load sources: ", sourcesError);
    }

    return {
        categories: categoriesError ? [] : categories,
        sources: sourcesError ? [] : sources,
    };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export const action: ActionFunction = async (args) => {
    return await createOperation(args);
};

export default function Dashboard() {
    return (
        <div>
            <OperationsFormTrigger>
                <Button variant='outline'>Dodaj wpis</Button>
            </OperationsFormTrigger>
        </div>
    );
}
