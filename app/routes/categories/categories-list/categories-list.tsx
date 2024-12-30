import { useLoaderData } from 'react-router';
import type { LoaderData } from '../index';
import CategoryItem from './category-item';
import { Button } from '~/components/ui/button';
import CategoryFormTrigger from '../category-form/category-form-trigger';

function CategoriesList() {
    const { categories } = useLoaderData<LoaderData>();

    return (
        <div className='grid'>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
            <CategoryFormTrigger>
                <Button>Dodaj</Button>
            </CategoryFormTrigger>
        </div>
    );
}

export default CategoriesList;
