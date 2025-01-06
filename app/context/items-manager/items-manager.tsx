import { type ReactNode } from 'react';

import { ItemsFormContextProvider } from './create-update/items-form-context';
import { ItemsDeletionContextProvider } from './delete/items-deletion-context';
import { ItemsListContextProvider } from './read/items-list-context';

export interface ItemsManagerProps<T> {
    items: T[];
    newItemFormValues: T;
    children?: ReactNode | undefined;
}

export function ItemsManager<T>({
    children,
    items,
    newItemFormValues,
}: ItemsManagerProps<T>) {
    return (
        <ItemsListContextProvider items={items}>
            <ItemsFormContextProvider newItemFormValues={newItemFormValues}>
                <ItemsDeletionContextProvider>{children}</ItemsDeletionContextProvider>
            </ItemsFormContextProvider>
        </ItemsListContextProvider>
    );
}
