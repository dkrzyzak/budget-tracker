import type { CategoryDto } from '~/db/models';
import Icon from './icon';

interface CategoryItemProps {
    category: CategoryDto;
}

function CategoryItem({ category }: CategoryItemProps) {
    return (
        <div className='border px-4 py-2 flex items-center gap-2'>
            {category.icon && <Icon svgSource={category.icon} color={category.color} />}
            <p>{category.name}</p>
        </div>
    );
}

export default CategoryItem;
