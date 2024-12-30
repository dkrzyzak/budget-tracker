import { useLoaderData } from 'react-router';
import type { LoaderData } from '../index';
import CategoryItem from './category-item';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { useCategoryManagement } from './category-management-context';

function CategoriesList() {
    const { categories } = useLoaderData<LoaderData>();
    const { createCategory } = useCategoryManagement();

    return (
        <div className='grid gap-2'>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}

            <Button onClick={createCategory}>
                <Plus />
                Nowa
            </Button>
        </div>
    );
}

export default CategoriesList;
