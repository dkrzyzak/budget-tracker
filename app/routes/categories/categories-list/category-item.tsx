import type { CategoryDto } from '~/db/models';
import Icon from './icon';
import { Button } from '~/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useCategoryManagement } from './category-management-context';

interface CategoryItemProps {
    category: CategoryDto;
}

function CategoryItem({ category }: CategoryItemProps) {
    const { editCategory, deleteCategory } = useCategoryManagement();

    return (
        <div className='border p-2 flex justify-between gap-4'>
            <div className='flex items-center gap-2 text-xl'>
                {category.icon && (
                    <Icon svgSource={category.icon} color={category.color} />
                )}
                <p className=''>{category.name}</p>
            </div>
            <div className='flex gap-2'>
                <Button variant='outline' onClick={() => editCategory(category)}>
                    <Pencil />
                </Button>
                <Button variant='destructive' onClick={() => deleteCategory(category)}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}

export default CategoryItem;
