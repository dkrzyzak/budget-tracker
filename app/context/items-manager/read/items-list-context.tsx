import { createContext, use, type ReactNode } from 'react';

export type ItemsListData<T> = {
    items: T[];
};

export const ItemsListContext = createContext<ItemsListData<any> | null>(null);

type ItemsListContextProviderProps<T> = {
    items: T[];
    children: ReactNode;
};

export function ItemsListContextProvider<T>({
    items,
    children,
}: ItemsListContextProviderProps<T>) {
    return (
        <ItemsListContext.Provider value={{ items }}>
            {children}
        </ItemsListContext.Provider>
    );
}

export function useItemsList<T>() {
    const contextValue = use(ItemsListContext);

    if (!contextValue) {
        throw new Error('useItemsList must be used within ItemsListContextProvider');
    }

    return contextValue as ItemsListData<T>;
}
