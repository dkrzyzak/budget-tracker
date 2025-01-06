import { useLoaderData } from 'react-router';
import type { LoaderData } from '../index';
import OperationItem from './operation-item';
import {
    DeleteItemDialog,
    ItemFormModal,
    ItemsManager,
    ListOutlet,
} from '~/context/items-manager';
import { initialData } from '~/routes/operations-form/constants';
import { useCallback } from 'react';
import type { OperationExtended } from '~/db/services/operations';
import { OperationsForm } from '~/routes/operations-form/operations-form';
import { Button } from '~/components/ui/button';

function OperationsList() {
    const { operations } = useLoaderData<LoaderData>();
    const itemMapper = useCallback(
        (operation: OperationExtended) => (
            <OperationItem key={operation.id} operation={operation} />
        ),
        []
    );

    return (
        <ItemsManager items={operations} newItemFormValues={initialData}>
            <ListOutlet className='grid gap-4' itemMapper={itemMapper} />

            <ItemFormModal
                titleCreate='Dodaj wpis'
                titleEdit='Edytuj wpis'
                descriptionCreate='Na co poszło tym razem? A może to dzień wypłaty?'
                descriptionEdit='Literówka? Brzydki kolor? Bez przypału, wszystko można zmienić ;-)'
                trigger={<Button variant='outline'>Dodaj wpis</Button>}
            >
                <OperationsForm />
            </ItemFormModal>

            {/* <DeleteItemDialog<OperationExtended> onDelete={onDelete} message={renderMessage} /> */}
        </ItemsManager>
    );
}

export default OperationsList;
