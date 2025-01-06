import { Plus } from 'lucide-react';
import { Button, type ButtonVariantProps } from '~/components/ui/button';
import { useItemsForm } from './items-form-context';

type AddItemOutletProps = {
    label?: string;
} & ButtonVariantProps;

export function AddItemOutlet({
    label = 'Nowa',
    variant = 'default',
}: AddItemOutletProps) {
    const { createItem } = useItemsForm();

    return (
        <Button variant={variant} onClick={createItem}>
            <Plus />
            {label}
        </Button>
    );
}
