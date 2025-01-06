import type { ReactNode } from 'react';
import {
    ResponsiveModal,
    type ResponsiveModalClassnames,
} from '~/components/responsive-modal';
import { useItemsForm } from './items-form-context';

const classNames: ResponsiveModalClassnames = {
    contentDesktop: 'sm:max-w-[425px]',
    contentMobile: 'px-8 pb-8',
    titleMobile: 'text-center mt-4',
    descriptionMobile: 'text-center my-2',
};

export type ItemFormModalProps = {
    children?: ReactNode;
    trigger?: ReactNode;
    titleCreate?: string;
    titleEdit?: string;
    descriptionCreate?: string;
    descriptionEdit?: string;
};

export function ItemFormModal({
    children,
    trigger,
    titleCreate,
    titleEdit,
    descriptionCreate,
    descriptionEdit,
}: ItemFormModalProps) {
    const { formMode, isModalOpen, setModalOpen } = useItemsForm();

    const title = formMode === 'create' ? titleCreate : titleEdit;
    const description = formMode === 'create' ? descriptionCreate : descriptionEdit;

    return (
        <ResponsiveModal
            isOpen={isModalOpen}
            setOpen={setModalOpen}
            title={title}
            description={description}
            classNames={classNames}
            trigger={trigger}
        >
            {children}
        </ResponsiveModal>
    );
}
