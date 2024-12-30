import { useState, type PropsWithChildren } from 'react';
import CategoryForm from './category-form';
import type { ResponsiveModalClassnames } from '~/components/responsive-modal';
import ResponsiveModal from '~/components/responsive-modal';

const classNames: ResponsiveModalClassnames = {
    contentDesktop: 'sm:max-w-[425px]',
    contentMobile: 'px-8 pb-8',
    titleMobile: 'text-center mt-4',
    descriptionMobile: 'text-center my-2',
};

function CategoryFormTrigger({ children }: PropsWithChildren) {
    const [isOpen, setOpen] = useState(false);

    return (
        <ResponsiveModal
            isOpen={isOpen}
            setOpen={setOpen}
            trigger={children}
            title='Edytuj kategorię'
            description='Literówka? Brzydki kolor? Bez przypału, wszystko można zmienić ;-)'
            classNames={classNames}
        >
            <CategoryForm setOpen={setOpen} />
        </ResponsiveModal>
    );
}

export default CategoryFormTrigger;
