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
import { useItemsDeletion } from './items-deletion-context';
import type { ReactNode } from 'react';

export type OnDelete<T> = (
    selectedItem: T,
    setDeleteDialogOpen: (open: boolean) => void
) => void;

export type RenderDeleteMessage<T> = (item: T) => ReactNode;

type DeleteItemDialogProps<T> = {
    message: RenderDeleteMessage<T>;
    onDelete: OnDelete<T>;
};

export function DeleteItemDialog<T>({ message, onDelete }: DeleteItemDialogProps<T>) {
    const { itemToDelete, isDeleteDialogOpen, setDeleteDialogOpen } =
        useItemsDeletion<T>();

    if (!itemToDelete) {
        return null;
    }

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Na pewno?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message(itemToDelete)}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Anuluj</AlertDialogCancel>
                    <AlertDialogAction
                        variant='destructive'
                        onClick={onDelete.bind(null, itemToDelete, setDeleteDialogOpen)}
                    >
                        Kontynuuj
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
