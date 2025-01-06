import { type PropsWithChildren } from 'react';
import { ItemFormModal } from '~/context/items-manager';
import { OperationsForm } from './operations-form';

export function OperationsFormTrigger({ children }: PropsWithChildren) {
    return (
        <ItemFormModal
            titleCreate='Dodaj wpis'
            titleEdit='Edytuj wpis'
            descriptionCreate='Na co poszło tym razem? A może to dzień wypłaty?'
            descriptionEdit='Literówka? Brzydki kolor? Bez przypału, wszystko można zmienić ;-)'
            trigger={children}
        >
            <OperationsForm />
        </ItemFormModal>
    );
}
