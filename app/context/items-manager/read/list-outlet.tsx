import { useItemsList } from './items-list-context';
import { AddItemOutlet } from '../create-update/add-item-outlet';

interface ListOutletProps<T> {
    className?: string;
    itemMapper: (item: T) => React.ReactNode;
    withAddButton?: boolean;
}

export function ListOutlet<T>({
    className,
    itemMapper,
    withAddButton,
}: ListOutletProps<T>) {
    const { items } = useItemsList<T>();

    return (
        <div className={className}>
            {items.map(itemMapper)}

            {withAddButton && <AddItemOutlet />}
        </div>
    );
}
