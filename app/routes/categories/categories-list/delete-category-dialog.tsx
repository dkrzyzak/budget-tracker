import { useCallback } from 'react';
import { toast } from 'sonner';
import {
    DeleteItemDialog,
    type OnDelete,
    type RenderDeleteMessage,
} from '~/context/items-manager';
import type { CategoryDto } from '~/db/models';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';

export function DeleteCategoryDialog() {
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

    return <DeleteItemDialog<CategoryDto> onDelete={onDelete} message={renderMessage} />;
}
