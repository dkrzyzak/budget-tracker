import { useCallback, useMemo, useState } from 'react';
import { type Operation } from '~/db/models';
import { NEW_OPTION_ID } from '~/lib/globals';
import { useFormContext } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import type { LoaderData } from '~/routes/first-screen';
import { ComboSelect } from '~/components/form/combo-select';

export function OperationSource() {
    const { sources: loadedSources } = useLoaderData<LoaderData>();
    const { watch, setValue } = useFormContext<Operation>();
    const selectedSourceId = watch('sourceId');
    const operationType = watch('type');

    const [sources, setSources] = useState(loadedSources);
    const selectedSource = sources.find((source) => source.id === selectedSourceId);

    const onSelectSource = (sourceId: number) => {
        setValue('sourceId', sourceId);
    };

    const addNewSource = useCallback((sourceName: string) => {
        setSources((current) => {
            // remove previous temporary source
            const newSources = current.filter((source) => source.id !== NEW_OPTION_ID);

            return [
                ...newSources,
                {
                    id: NEW_OPTION_ID,
                    name: sourceName,
                    frequency: 0,
                    color: '',
                    icon: '',
                },
            ];
        });
    }, []);

    const { fieldLabel, unselectedLabel, emptyListLabel } = useMemo(
        () =>
            operationType === 'expense'
                ? {
                      fieldLabel: 'Odbiorca',
                      unselectedLabel: '+ Wybierz odbiorcę',
                      emptyListLabel: 'Dodaj odbiorcę',
                  }
                : {
                      fieldLabel: 'Źródło',
                      unselectedLabel: '+ Wybierz źródło',
                      emptyListLabel: 'Dodaj źródło',
                  },
        [operationType]
    );

    const targetLabel = selectedSource ? selectedSource.name : unselectedLabel;

    return (
        <ComboSelect
            options={sources}
            fieldId='source'
            fieldLabel={fieldLabel}
            targetLabel={targetLabel}
            addNewOption={addNewSource}
            emptyListLabel={emptyListLabel}
            onSelectOption={onSelectSource}
        />
    );
}
