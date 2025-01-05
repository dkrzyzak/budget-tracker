import SourceForm, { type FormMode } from '../source-form/source-form';
import {
    ResponsiveModal,
    type ResponsiveModalClassnames,
} from '~/components/responsive-modal';
import type { SourceFormData } from '~/db/models';

const classNames: ResponsiveModalClassnames = {
    contentDesktop: 'sm:max-w-[425px]',
    contentMobile: 'px-8 pb-8',
    titleMobile: 'text-center mt-4',
    descriptionMobile: 'text-center my-2',
};

export type SourceFormModalProps = {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    formMode: FormMode;
    defaultValues: SourceFormData;
};

function SourceFormModal({
    isOpen,
    setOpen,
    formMode,
    defaultValues,
}: SourceFormModalProps) {
    const title = formMode === 'create' ? 'Dodaj źródło' : 'Edytuj źródło';

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
            <SourceForm
                defaultValues={defaultValues}
                formMode={formMode}
                setOpen={setOpen}
            />
        </ResponsiveModal>
    );
}

export default SourceFormModal;
