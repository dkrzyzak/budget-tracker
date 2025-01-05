import { useState, type PropsWithChildren } from 'react';
import OperationsForm from './operations-form';
import {
    ResponsiveModal,
    type ResponsiveModalClassnames,
} from '~/components/responsive-modal';

const classNames: ResponsiveModalClassnames = {
    contentDesktop: 'sm:max-w-[425px]',
    contentMobile: 'px-8 pb-8',
    titleMobile: 'text-center mt-4',
    descriptionMobile: 'text-center my-2',
};

function OperationsFormTrigger({ children }: PropsWithChildren) {
    const [isOpen, setOpen] = useState(false);

    return (
        <ResponsiveModal
            isOpen={isOpen}
            setOpen={setOpen}
            trigger={children}
            title='Dodaj wpis'
            description='Na co poszło tym razem? A może to dzień wypłaty?'
            classNames={classNames}
        >
            <OperationsForm setOpen={setOpen} />
        </ResponsiveModal>
    );
}

export default OperationsFormTrigger;
