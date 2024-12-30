import { type ActionFunctionArgs, type MetaFunction } from 'react-router';
import { getCategories } from '~/db/services/categories';
import CategoriesList from './categories-list/categories-list';
import { createCategoryAction } from '~/actions/categories/create';
import { deleteCategoryAction } from '~/actions/categories/delete';

export const meta: MetaFunction = () => {
    return [{ title: 'Kategorie | Billans' }];
};

export const loader = async () => {
    const categories = await getCategories();

    return { categories };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export const action = (args: ActionFunctionArgs) => {
    const method = args.request.method;
    console.log(method);

    switch (method) {
        case 'POST': {
            return createCategoryAction(args);
        }
        // case 'PUT': {
        //     return updateCategoryAction(args);
        // }
        case 'DELETE': {
            return deleteCategoryAction(args);
        }
    }

    return null;

};

export default function CategoriesPage() {
    return (
        <div className='grid'>
            <h1>Kategorie</h1>
            <CategoriesList />
        </div>
    );
}
