import CategoryForm, { type FormMode } from '../category-form/category-form';
import type { ResponsiveModalClassnames } from '~/components/responsive-modal';
import ResponsiveModal from '~/components/responsive-modal';
import type { CategoryFormData } from '~/db/models';

const classNames: ResponsiveModalClassnames = {
    contentDesktop: 'sm:max-w-[425px]',
    contentMobile: 'px-8 pb-8',
    titleMobile: 'text-center mt-4',
    descriptionMobile: 'text-center my-2',
};

export type CategoryFormTriggerProps = {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    formMode: FormMode;
    defaultValues: CategoryFormData;
};

function CategoryFormModal({
    isOpen,
    setOpen,
    formMode,
    defaultValues,
}: CategoryFormTriggerProps) {
    const title = formMode === 'create' ? 'Dodaj kategorię' : 'Edytuj kategorię';

    const description =
        formMode === 'create'
            ? 'Czego jeszcze brakuje? Dodawaj śmiało ;-)'
            : 'Literówka? Brzydki kolor? Bez przypału, wszystko można zmienić ;-)';

    return (
        <ResponsiveModal
            isOpen={isOpen}
            setOpen={setOpen}
            title={title}
            description={description}
            classNames={classNames}
        >
            <CategoryForm
                defaultValues={defaultValues}
                formMode={formMode}
                setOpen={setOpen}
            />
        </ResponsiveModal>
    );
}

export default CategoryFormModal;
