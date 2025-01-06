import { type MetaFunction } from 'react-router';

import { createOperation } from '~/actions/operations/create.server';
import { Button } from '~/components/ui/button';
import { ItemsFormContextProvider } from '~/context/items-manager/create-update/items-form-context';
import { getCategoriesByFrequency } from '~/db/services/categories';
import { getSourcesByFrequency } from '~/db/services/sources/getSource';
import { promised } from '~/lib/utils';

import { OperationsFormTrigger } from '../operations-form/operations-form-trigger';
import { initialData } from '../operations-form/constants';

export const meta: MetaFunction = () => {
    return [{ title: 'Strona główna | Billans' }];
};

export const loader = async () => {
    const [categories, categoriesError] = await promised(getCategoriesByFrequency);
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
            <ItemsFormContextProvider newItemFormValues={initialData}>
                <OperationsFormTrigger>
                    <Button variant='outline'>Dodaj wpis</Button>
                </OperationsFormTrigger>
            </ItemsFormContextProvider>
        </div>
    );
}
