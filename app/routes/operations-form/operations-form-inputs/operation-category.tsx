import { useCallback, useState } from 'react';
import { useMediaQuery } from '~/hooks/use-media-query';
import { Button } from '~/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '~/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { type Operation } from '~/db/models';
import { NEW_OPTION_ID } from '~/lib/globals';
import { useFormContext } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import type { LoaderData } from '~/routes/first-screen';
import { OptionsList } from './options-list';

export function OperationCategory() {
    const { categories: loadedCategories } = useLoaderData<LoaderData>();
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { watch } = useFormContext<Operation>();
    const selectedCategoryId = watch('categoryId');

    const [categories, setCategories] = useState(loadedCategories);
    const [isModalOpened, setModalOpened] = useState(false);
    const selectedCategory = categories.find(
        (category) => category.id === selectedCategoryId
    );

    const addNewCategory = useCallback((categoryName: string) => {
        setCategories((current) => {
            // remove previous temporary category
            const newCategories = current.filter(
                (category) => category.id !== NEW_OPTION_ID
            );

            return [
                ...newCategories,
                {
                    id: NEW_OPTION_ID,
                    name: categoryName,
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
                <label className='text-sm' htmlFor='category'>Kategoria</label>
                <Popover open={isModalOpened} onOpenChange={setModalOpened}>
                    <PopoverTrigger asChild>
                        <Button variant='outline' id="category" className='flex-1'>
                            {selectedCategory ? (
                                <>{selectedCategory.name}</>
                            ) : (
                                <>+ Wybierz kategorię</>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0' align='start'>
                        <OptionsList
                            options={categories}
                            fieldName='categoryId'
                            commandEmptyCTA='Dodaj kategorię'
                            setOpen={setModalOpened}
                            addNewOption={addNewCategory}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    return (
        <div className='flex items-center gap-4'>
            <label className='text-sm' htmlFor='category'>Kategoria</label>
            <Drawer open={isModalOpened} onOpenChange={setModalOpened}>
                <DrawerTrigger asChild>
                    <Button variant='outline' id="category" className='flex-1'>
                        {selectedCategory ? (
                            <>{selectedCategory.name}</>
                        ) : (
                            <>+ Wybierz kategorię</>
                        )}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerTitle className='sr-only' />
                    <DrawerDescription className='sr-only' />

                    <div className='mt-4 border-t'>
                        <OptionsList
                            options={categories}
                            fieldName='categoryId'
                            commandEmptyCTA='Dodaj kategorię'
                            setOpen={setModalOpened}
                            addNewOption={addNewCategory}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
