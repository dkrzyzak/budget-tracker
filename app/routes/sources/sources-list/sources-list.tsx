import { useCallback } from 'react';
import { useLoaderData } from 'react-router';

import {
    ItemFormModal,
    ItemsManager,
    ListOutlet,
} from '~/context/items-manager';
import type { SourceDto } from '~/db/models';

import type { LoaderData } from '../index';
import SourceItem from './source-item';
import { emptySourceData } from '../source-form/constants';
import SourceForm from '../source-form/source-form';
import { DeleteSourceDialog } from './delete-source-dialog';

export function SourcesList() {
    const { sources } = useLoaderData<LoaderData>();
    const itemMapper = useCallback(
        (source: SourceDto) => <SourceItem key={source.id} source={source} />,
        []
    );

    return (
        <ItemsManager items={sources} newItemFormValues={emptySourceData}>
            <ListOutlet<SourceDto>
                withAddButton
                itemMapper={itemMapper}
                className='grid gap-2'
            />

            <ItemFormModal
                titleCreate='Dodaj źródło'
                titleEdit='Edytuj źródło'
                descriptionCreate='Czego jeszcze brakuje? Dodawaj śmiało ;-)'
                descriptionEdit='Literówka? Brzydki kolor? Bez przypału, wszystko można zmienić ;-)'
            >
                <SourceForm />
            </ItemFormModal>

            <DeleteSourceDialog />
        </ItemsManager>
    );
}
