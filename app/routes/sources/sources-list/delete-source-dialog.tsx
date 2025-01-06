import { useCallback } from 'react';
import { toast } from 'sonner';
import {
    DeleteItemDialog,
    type OnDelete,
    type RenderDeleteMessage,
} from '~/context/items-manager';
import type { SourceDto } from '~/db/models';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';

export function DeleteSourceDialog() {
    const { submit } = useAwaitedFetcher();
    const onDelete: OnDelete<SourceDto> = async (selectedSource, setDeleteDialogOpen) => {
        const { success, message } = await submit(
            { sourceId: selectedSource.id },
            { method: 'DELETE' }
        );

        if (!success) {
            return toast.error(message);
        }

        setDeleteDialogOpen(false);
        toast.info(message);
    };

    const renderMessage: RenderDeleteMessage<SourceDto> = useCallback(
        (source) => (
            <>
                Chcesz usunąć źródło <strong>{source.name}</strong>. Tego działania nie
                będzie można cofnąć.
            </>
        ),
        []
    );

    return <DeleteItemDialog<SourceDto> onDelete={onDelete} message={renderMessage} />;
}
