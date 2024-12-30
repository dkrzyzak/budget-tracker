import { type MetaFunction } from 'react-router';
import { getCategoriesByUsage } from '~/db/services/categories';
import CategoriesList from './categories-list/categories-list';
import { createCategoryAction } from '~/actions/categories/create';
import { deleteCategoryAction } from '~/actions/categories/delete';
import { CategoryContextProvider } from './categories-list/category-management-context';
import { updateCategoryAction } from '~/actions/categories/update';

export const meta: MetaFunction = () => {
    return [{ title: 'Kategorie | Billans' }];
};

export const loader = async () => {
    const categories = await getCategoriesByUsage();

    return { categories };
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

    return Promise.resolve({ success: true, message: 'cyk' });
};

export default function CategoriesPage() {
    return (
        <div className='grid'>
            <h1 className='text-3xl mb-12'>Kategorie</h1>
            <CategoryContextProvider>
                <CategoriesList />
            </CategoryContextProvider>
        </div>
    );
}
