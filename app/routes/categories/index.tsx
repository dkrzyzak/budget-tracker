import { type MetaFunction } from 'react-router';

import { createCategoryAction } from '~/actions/categories/create.server';
import { deleteCategoryAction } from '~/actions/categories/delete.server';
import { updateCategoryAction } from '~/actions/categories/update.server';
import { getCategoriesByFrequency } from '~/db/services/categories';

import { CategoriesList } from './categories-list/categories-list';
import { promised } from '~/lib/utils';

export const meta: MetaFunction = () => {
    return [{ title: 'Kategorie | Billans' }];
};

export const loader = async () => {
    const [categories, categoriesError] = await promised(getCategoriesByFrequency);

    return { categories: categoriesError ? [] : categories };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export const action: ActionFunction = (args) => {
    const method = args.request.method;

    switch (method) {
        case 'POST': {
            return createCategoryAction(args);
        }
        case 'PUT': {
            return updateCategoryAction(args);
        }
        case 'DELETE': {
            return deleteCategoryAction(args);
        }
    }

    return Promise.resolve({ success: false, message: 'Tej metody nie obsługujemy' });
};

export default function CategoriesPage() {
    return (
        <div className='grid my-16'>
            <h1 className='text-3xl mb-12'>Kategorie</h1>
            <CategoriesList />
        </div>
    );
}
