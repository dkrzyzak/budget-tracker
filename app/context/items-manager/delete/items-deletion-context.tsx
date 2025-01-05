import {
    createContext,
    use,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type ItemsDeletionData<T> = {
    deleteItem: (item: T) => void;
    itemToDelete: T | null;
    isDeleteDialogOpen: boolean;
    setDeleteDialogOpen: (open: boolean) => void;
};

export const ItemsDeletionContext = createContext<ItemsDeletionData<any> | null>(null);

type ItemsDeletionContextProviderProps = {
    children: ReactNode;
};

export function ItemsDeletionContextProvider<T>({
    children,
}: ItemsDeletionContextProviderProps) {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<T | null>(null);

    const deleteItem = useCallback((item: T) => {
        setItemToDelete(item);
        setDeleteDialogOpen(true);
    }, []);

    const contextValue: ItemsDeletionData<T> = useMemo(
        () => ({
            isDeleteDialogOpen,
            setDeleteDialogOpen,
            deleteItem,
            itemToDelete,
        }),
        [isDeleteDialogOpen, deleteItem, itemToDelete]
    );

    return (
        <ItemsDeletionContext.Provider value={contextValue}>
            {children}
        </ItemsDeletionContext.Provider>
    );
}

export function useItemsDeletion<F>() {
    const contextValue = use(ItemsDeletionContext);

    if (!contextValue) {
        throw new Error(
            'useItemsDeletion must be used within ItemsDeletionContextProvider'
        );
    }

    return contextValue as ItemsDeletionData<F>;
}
