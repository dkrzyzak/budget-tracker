import {
    createContext,
    use,
    useCallback,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react';
import CategoryFormModal from './category-form-modal';
import { emptyCategoryData } from '../category-form/constants';
import type { CategoryDto } from '~/db/models';
import type { FormMode } from '../category-form/category-form';

export type CategoryContextData = {
    createCategory: () => void;
    editCategory: (category: CategoryDto) => void;
    deleteCategory: (categoryId: number) => void;
};

export const CategoryContext = createContext<CategoryContextData | null>(null);

export function CategoryContextProvider({ children }: PropsWithChildren) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>('create');
    const [formDefaultValues, setFormDefaultValues] = useState(emptyCategoryData);

    const createCategory = useCallback(() => {
        setFormMode('create');
        setFormDefaultValues(emptyCategoryData);
        setModalOpen(true);
    }, []);

    const editCategory = useCallback((category: CategoryDto) => {
        setFormMode('edit');
        setFormDefaultValues({
            name: category.name,
            color: category.color,
            icon: category.icon,
        });
        setModalOpen(true);
    }, []);

    const deleteCategory = useCallback((categoryId: number) => {
        console.log('usuwamy ', categoryId);
    }, []);

    const contextValue = useMemo(
        () => ({
            createCategory,
            editCategory,
            deleteCategory,
        }),
        [createCategory, editCategory, deleteCategory]
    );

    return (
        <CategoryContext.Provider value={contextValue}>
            {children}

            <CategoryFormModal
                formMode={formMode}
                defaultValues={formDefaultValues}
                isOpen={isModalOpen}
                setOpen={setModalOpen}
            />
        </CategoryContext.Provider>
    );
}

export function useCategoryManagement() {
    const contextValue = use(CategoryContext);

    if (!contextValue) {
        throw new Error('To use CategoryContext, wrap tree with its Context.Provider');
    }

    return contextValue;
}
