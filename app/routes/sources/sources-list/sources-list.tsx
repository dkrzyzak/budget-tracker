import { useCallback } from 'react';
import { useLoaderData } from 'react-router';
import { toast } from 'sonner';

import {
    DeleteItemDialog,
    ItemFormModal,
    ItemsManager,
    ListOutlet,
    type OnDelete,
    type RenderDeleteMessage,
} from '~/context/items-manager';
import type { SourceDto } from '~/db/models';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';

import type { LoaderData } from '../index';
import SourceItem from './source-item';
import { emptySourceData } from '../source-form/constants';
import SourceForm from '../source-form/source-form';

export function SourcesList() {
    const { sources } = useLoaderData<LoaderData>();
    const itemMapper = useCallback(
        (source: SourceDto) => <SourceItem key={source.id} source={source} />,
        []
    );

    const { submit } = useAwaitedFetcher();
    const onDelete: OnDelete<SourceDto> = async (selectedSource, setDeleteDialogOpen) => {
        const { success, message } = await submit(
            { sourceId: selectedSource.id },
            { method: 'DELETE' }
        );

        if (!success) {
            return toast.error(message);
        }

        setDeleteDialogOpen(false);
        toast.info(message);
    };

    const renderMessage: RenderDeleteMessage<SourceDto> = useCallback(
        (source) => (
            <>
                Chcesz usunąć źródło <strong>{source.name}</strong>. Tego działania nie
                będzie można cofnąć.
            </>
        ),
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

            <DeleteItemDialog<SourceDto> onDelete={onDelete} message={renderMessage} />
        </ItemsManager>
    );
}
