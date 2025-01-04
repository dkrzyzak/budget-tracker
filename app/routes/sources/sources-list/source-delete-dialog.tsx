import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import type { SourceDto } from '~/db/models';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';

interface SourceDeleteDialogProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    selectedSource: SourceDto | undefined;
}

function SourceDeleteDialog({
    isOpen,
    setOpen,
    selectedSource,
}: SourceDeleteDialogProps) {
    const { submit } = useAwaitedFetcher();

    if (!selectedSource) {
        return null;
    }

    const onDelete = async () => {
        const { success, message } = await submit(
            { sourceId: selectedSource.id },
            { method: 'DELETE' }
        );

        if (!success) {
            return toast.error(message);
        }

        setOpen(false);
        toast.info(message);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Na pewno?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Chcesz usunąć źródło <strong>{selectedSource.name}</strong>.
                        Tego działania nie będzie można cofnąć.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Anuluj</AlertDialogCancel>
                    <AlertDialogAction variant='destructive' onClick={onDelete}>
                        Kontynuuj
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default SourceDeleteDialog;
