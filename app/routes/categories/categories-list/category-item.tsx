import { Pencil, Trash } from 'lucide-react';

import SvgIcon from '~/components/icon';
import { Button } from '~/components/ui/button';
import { useItemsDeletion, useItemsForm } from '~/context/items-manager';
import type { CategoryDto } from '~/db/models';

interface CategoryItemProps {
    category: CategoryDto;
}

function CategoryItem({ category }: CategoryItemProps) {
    const { editItem } = useItemsForm<CategoryDto>();
    const { deleteItem } = useItemsDeletion<CategoryDto>();

    return (
        <div className='border p-2 flex justify-between gap-4'>
            <div className='flex items-center gap-4 text-xl'>
                {category.icon && (
                    <SvgIcon svgSource={category.icon} color={category.color} />
                )}
                <p>{category.name}</p>
            </div>
            <div className='flex gap-2'>
                <Button variant='outline' onClick={() => editItem(category)}>
                    <Pencil />
                </Button>
                <Button variant='destructive' onClick={() => deleteItem(category)}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}

export default CategoryItem;
