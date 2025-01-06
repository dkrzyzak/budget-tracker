import { useCallback } from 'react';
import { useLoaderData } from 'react-router';

import { ItemsManager, ListOutlet, ItemFormModal } from '~/context/items-manager';
import type { CategoryDto } from '~/db/models';

import type { LoaderData } from '../index';
import CategoryItem from './category-item';
import CategoryForm from '../category-form/category-form';
import { emptyCategoryData } from '../category-form/constants';
import { DeleteCategoryDialog } from './delete-category-dialog';

export function CategoriesList() {
    const { categories } = useLoaderData<LoaderData>();
    const itemMapper = useCallback(
        (category: CategoryDto) => <CategoryItem key={category.id} category={category} />,
        []
    );

    return (
        <ItemsManager items={categories} newItemFormValues={emptyCategoryData}>
            <ListOutlet<CategoryDto>
                withAddButton
                itemMapper={itemMapper}
                className='grid gap-2'
            />

            <ItemFormModal
                titleCreate='Dodaj kategorię'
                titleEdit='Edytuj kategorię'
                descriptionCreate='Czego jeszcze brakuje? Dodawaj śmiało ;-)'
                descriptionEdit='Literówka? Brzydki kolor? Bez przypału, wszystko można zmienić ;-)'
            >
                <CategoryForm />
            </ItemFormModal>

            <DeleteCategoryDialog />
        </ItemsManager>
    );
}
