import { useCallback, useState } from 'react';
import { useMediaQuery } from '~/hooks/use-media-query';
import { Button } from '~/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { type Operation } from '~/db/models';
import { useFormContext } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import type { LoaderData } from '~/routes/first-screen';
import { OptionsList } from './options-list';
import { NEW_OPTION_ID } from '../constants';

export function OperationSource() {
    const { sources: loadedSources } = useLoaderData<LoaderData>();
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { watch } = useFormContext<Operation>();
    const selectedSourceId = watch('sourceId');
    const operationType = watch('type');

    const [sources, setSources] = useState(loadedSources);
    const [isModalOpened, setModalOpened] = useState(false);
    const selectedSource = sources.find((source) => source.id === selectedSourceId);

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

    if (isDesktop) {
        return (
            <div className='flex items-center gap-4'>
                <p className='text-sm'>
                    {operationType === 'expense' ? 'Odbiorca' : 'Źródło'}
                </p>
                <Popover open={isModalOpened} onOpenChange={setModalOpened}>
                    <PopoverTrigger asChild>
                        <Button variant='outline' className='flex-1'>
                            {selectedSource ? (
                                <>{selectedSource.name}</>
                            ) : (
                                <>
                                    {operationType === 'expense'
                                        ? '+ Wybierz odbiorcę'
                                        : '+ Wybierz źródło'}
                                </>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0' align='start'>
                        <OptionsList
                            options={sources}
                            fieldName='sourceId'
                            commandEmptyCTA={
                                operationType === 'expense'
                                    ? 'Dodaj odbiorcę'
                                    : 'Dodaj źródło'
                            }
                            setOpen={setModalOpened}
                            addNewOption={addNewSource}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    return (
        <div className='flex items-center gap-4'>
            <p className='text-sm'>
                {operationType === 'expense' ? 'Odbiorca' : 'Źródło'}
            </p>
            <Drawer open={isModalOpened} onOpenChange={setModalOpened}>
                <DrawerTrigger asChild>
                    <Button variant='outline' className='flex-1'>
                        {selectedSource ? (
                            <>{selectedSource.name}</>
                        ) : (
                            <>
                                {operationType === 'expense'
                                    ? '+ Wybierz odbiorcę'
                                    : '+ Wybierz źródło'}
                            </>
                        )}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className='mt-4 border-t'>
                        <OptionsList
                            options={sources}
                            fieldName='sourceId'
                            commandEmptyCTA={
                                operationType === 'expense'
                                    ? 'Dodaj odbiorcę'
                                    : 'Dodaj źródło'
                            }
                            setOpen={setModalOpened}
                            addNewOption={addNewSource}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
