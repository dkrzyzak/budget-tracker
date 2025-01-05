import {
    createContext,
    use,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type FormMode = 'create' | 'edit';

export type ItemsFormData<F> = {
    createItem: () => void;
    editItem: (item: F) => void;
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    formMode: FormMode;
    formDefaultValues: F;
};

export const ItemsFormContext = createContext<ItemsFormData<any> | null>(null);

type ItemsFormContextProviderProps<F> = {
    newItemFormValues: F;
    children: ReactNode;
};

export function ItemsFormContextProvider<F>({
    newItemFormValues,
    children,
}: ItemsFormContextProviderProps<F>) {
    // CREATE/UPDATE STATE
    const [isModalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>('create');
    const [formDefaultValues, setFormDefaultValues] = useState(newItemFormValues);

    const createItem = useCallback(() => {
        setFormMode('create');
        setFormDefaultValues(newItemFormValues);
        setModalOpen(true);
    }, [newItemFormValues]);

    const editItem = useCallback((item: F) => {
        setFormMode('edit');
        setFormDefaultValues(item);
        setModalOpen(true);
    }, []);

    const contextValue: ItemsFormData<F> = useMemo(
        () => ({
            createItem,
            editItem,
            isModalOpen,
            setModalOpen,
            formMode,
            formDefaultValues,
        }),
        [createItem, editItem, isModalOpen, formMode, formDefaultValues]
    );

    return (
        <ItemsFormContext.Provider value={contextValue}>
            {children}
        </ItemsFormContext.Provider>
    );
}

export function useItemsForm<F>() {
    const contextValue = use(ItemsFormContext);

    if (!contextValue) {
        throw new Error('useItemsForm must be used within ItemsFormContextProvider');
    }

    return contextValue as ItemsFormData<F>;
}
