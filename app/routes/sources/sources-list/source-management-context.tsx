import {
    createContext,
    use,
    useCallback,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react';
import SourceFormModal from './source-form-modal';
import { emptySourceData } from '../source-form/constants';
import type { SourceDto } from '~/db/models';
import type { FormMode } from '../source-form/source-form';
import SourceDeleteDialog from './source-delete-dialog';

export type SourceContextData = {
    createSource: () => void;
    editSource: (source: SourceDto) => void;
    deleteSource: (source: SourceDto) => void;
};

export const SourceContext = createContext<SourceContextData | null>(null);

export function SourceContextProvider({ children }: PropsWithChildren) {
    // CREATE/UPDATE STATE
    const [isModalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>('create');
    const [formDefaultValues, setFormDefaultValues] = useState(emptySourceData);

    // DELETE STATE
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [sourceToDelete, setSourceToDelete] = useState<SourceDto>();

    const createSource = useCallback(() => {
        setFormMode('create');
        setFormDefaultValues(emptySourceData);
        setModalOpen(true);
    }, []);

    const editSource = useCallback((source: SourceDto) => {
        setFormMode('edit');
        setFormDefaultValues(source);
        setModalOpen(true);
    }, []);

    const deleteSource = useCallback((source: SourceDto) => {
        setSourceToDelete(source);
        setDeleteDialogOpen(true);
    }, []);

    const contextValue = useMemo(
        () => ({
            createSource,
            editSource,
            deleteSource,
        }),
        [createSource, editSource, deleteSource]
    );

    return (
        <SourceContext.Provider value={contextValue}>
            {children}

            <SourceFormModal
                formMode={formMode}
                defaultValues={formDefaultValues}
                isOpen={isModalOpen}
                setOpen={setModalOpen}
            />

            <SourceDeleteDialog
                selectedSource={sourceToDelete}
                isOpen={isDeleteDialogOpen}
                setOpen={setDeleteDialogOpen}
            />
        </SourceContext.Provider>
    );
}

export function useSourceManagement() {
    const contextValue = use(SourceContext);

    if (!contextValue) {
        throw new Error('To use SourceContext, wrap tree with its Context.Provider');
    }

    return contextValue;
}
