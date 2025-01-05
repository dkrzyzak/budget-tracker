import { Plus } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useItemsForm } from './items-form-context';

export function AddItemOutlet({ label = 'Nowa' }: { label?: string }) {
    const { createItem } = useItemsForm();

    return (
        <Button onClick={createItem}>
            <Plus />
            {label}
        </Button>
    );
}
