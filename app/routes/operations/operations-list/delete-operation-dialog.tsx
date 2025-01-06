import { useCallback } from 'react';
import { toast } from 'sonner';
import {
    DeleteItemDialog,
    type OnDelete,
    type RenderDeleteMessage,
} from '~/context/items-manager';
import type { OperationExtended } from '~/db/services/operations';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';
import { formatDefault } from '~/lib/utils/date';

export function DeleteOperationDialog() {
    const { submit } = useAwaitedFetcher();
    const onDelete: OnDelete<OperationExtended> = async (
        selectedOperation,
        setDeleteDialogOpen
    ) => {
        const { success, message } = await submit(
            { operationId: selectedOperation.id },
            { method: 'DELETE' }
        );

        if (!success) {
            return toast.error(message);
        }

        setDeleteDialogOpen(false);
        toast.info(message);
    };

    const renderMessage: RenderDeleteMessage<OperationExtended> = useCallback(
        (operation) => (
            <>
                Chcesz usunąć wpis <strong>{operation.name}</strong> z dnia{' '}
                {formatDefault(operation.operationDate)}. Tego działania nie będzie można
                cofnąć.
            </>
        ),
        []
    );

    return (
        <DeleteItemDialog<OperationExtended>
            onDelete={onDelete}
            message={renderMessage}
        />
    );
}
