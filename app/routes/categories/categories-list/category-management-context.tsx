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
import CategoryDeleteDialog from './category-delete-dialog';

export type CategoryContextData = {
    createCategory: () => void;
    editCategory: (category: CategoryDto) => void;
    deleteCategory: (category: CategoryDto) => void;
};

export const CategoryContext = createContext<CategoryContextData | null>(null);

export function CategoryContextProvider({ children }: PropsWithChildren) {
    // CREATE/UPDATE STATE
    const [isModalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>('create');
    const [formDefaultValues, setFormDefaultValues] = useState(emptyCategoryData);

    // DELETE STATE
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryDto>();

    const createCategory = useCallback(() => {
        setFormMode('create');
        setFormDefaultValues(emptyCategoryData);
        setModalOpen(true);
    }, []);

    const editCategory = useCallback((category: CategoryDto) => {
        setFormMode('edit');
        setFormDefaultValues(category);
        setModalOpen(true);
    }, []);

    const deleteCategory = useCallback((category: CategoryDto) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
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

            <CategoryDeleteDialog
                selectedCategory={categoryToDelete}
                isOpen={isDeleteDialogOpen}
                setOpen={setDeleteDialogOpen}
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
