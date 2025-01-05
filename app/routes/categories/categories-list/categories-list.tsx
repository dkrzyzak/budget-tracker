import { useLoaderData } from 'react-router';
import { useCallback } from 'react';
import type { LoaderData } from '../index';
import CategoryItem from './category-item';
import type { CategoryDto } from '~/db/models';
import { emptyCategoryData } from '../category-form/constants';
import CategoryForm from '../category-form/category-form';
import {
    ItemsManager,
    DeleteItemDialog,
    ListOutlet,
    ItemFormModal,
    type OnDelete,
    type RenderDeleteMessage,
} from '~/context/items-manager';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';
import { toast } from 'sonner';

function CategoriesList() {
    const { categories } = useLoaderData<LoaderData>();
    const itemMapper = useCallback(
        (category: CategoryDto) => <CategoryItem key={category.id} category={category} />,
        []
    );

    const { submit } = useAwaitedFetcher();
    const onDelete: OnDelete<CategoryDto> = async (selectedItem, setDeleteDialogOpen) => {
        const { success, message } = await submit(
            { categoryId: selectedItem.id },
            { method: 'DELETE' }
        );

        if (!success) {
            return toast.error(message);
        }

        setDeleteDialogOpen(false);
        toast.info(message);
    };

    const renderMessage: RenderDeleteMessage<CategoryDto> = useCallback(
        (category) => (
            <>
                Chcesz usunąć kategorię <strong>{category.name}</strong>. Tego działania
                nie będzie można cofnąć.
            </>
        ),
        []
    );

    return (
        <div>
            <ItemsManager items={categories} newItemFormValues={emptyCategoryData}>
                <ListOutlet<CategoryDto> withAddButton itemMapper={itemMapper} className='grid gap-2' />

                <ItemFormModal
                    titleCreate='Dodaj kategorię'
                    titleEdit='Edytuj kategorię'
                    descriptionCreate='Czego jeszcze brakuje? Dodawaj śmiało ;-)'
                    descriptionEdit='Literówka? Brzydki kolor? Bez przypału, wszystko można zmienić ;-)'
                >
                    <CategoryForm />
                </ItemFormModal>

                <DeleteItemDialog<CategoryDto>
                    onDelete={onDelete}
                    message={renderMessage}
                />
            </ItemsManager>
        </div>
    );
}

export default CategoriesList;
