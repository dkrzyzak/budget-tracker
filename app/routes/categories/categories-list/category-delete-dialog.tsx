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
import type { CategoryDto } from '~/db/models';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';

interface CategoryDeleteDialogProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    selectedCategory: CategoryDto | undefined;
}

function CategoryDeleteDialog({
    isOpen,
    setOpen,
    selectedCategory,
}: CategoryDeleteDialogProps) {
    const { submit } = useAwaitedFetcher();

    if (!selectedCategory) {
        return null;
    }

    const onDelete = async () => {
        const { success, message } = await submit(
            { categoryId: selectedCategory.id },
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
                        Chcesz usunąć kategorię <strong>{selectedCategory.name}</strong>.
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

export default CategoryDeleteDialog;
