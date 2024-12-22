import { useState } from 'react';
import { useMediaQuery } from '~/hooks/use-media-query';
import { Button } from '~/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '~/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { type Operation, type CategoryDto } from '~/db/models';
import { Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useLoaderData, useRevalidator } from 'react-router';
import { promisedAction } from '~/lib/utils';

export function OperationCategory() {
    const { categories } = useLoaderData() as { categories: CategoryDto[] };
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { watch } = useFormContext<Operation>();
    const selectedCategoryId = watch('categoryId');
    const selectedCategory = categories.find(
        (category) => category.id === selectedCategoryId
    );

    if (isDesktop) {
        return (
            <div className='flex items-center gap-4'>
                <p className='text-sm'>Kategoria</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant='outline' className='flex-1'>
                            {selectedCategory ? (
                                <>{selectedCategory.name}</>
                            ) : (
                                <>+ Wybierz kategorię</>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0' align='start'>
                        <CategoriesList setOpen={setOpen} />
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    return (
        <div className='flex items-center gap-4'>
            <p className='text-sm'>Kategoria</p>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant='outline' className='flex-1'>
                        {selectedCategory ? (
                            <>{selectedCategory.name}</>
                        ) : (
                            <>+ Wybierz kategorię</>
                        )}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className='mt-4 border-t'>
                        <CategoriesList setOpen={setOpen} />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

interface CategoriesListProps {
    setOpen: (open: boolean) => void;
}

function CategoriesList({ setOpen }: CategoriesListProps) {
    const { categories } = useLoaderData() as { categories: CategoryDto[] };
    const [categoryName, setCategoryName] = useState('');
    const { setValue } = useFormContext<Operation>();
    const { revalidate } = useRevalidator();

    const onAddCategory = async () => {
        // add new category to database (display loader on the button) while adding category
        const formData = new FormData();
        formData.append('categoryName', categoryName);

        const { success, message } = await promisedAction('/api/categories/create', {
            method: 'POST',
            body: formData,
        });

        if (success) {
            await revalidate();
        } else {
            console.log("Błąd", message);
        }

        

        // set as a value in the form, after updating the db and receiving updated categories list
        // maybe add an optimistic update for categories? depending on how long will it take to update db

        // close combobox
        setOpen(false);
    };

    const onSelectCategory = (value: string) => {
        console.log(value);

        setValue('categoryId', value);
        setOpen(false);
    };

    return (
        <Command>
            <CommandInput
                value={categoryName}
                onValueChange={setCategoryName}
                placeholder='Wyszukaj...'
            />
            <CommandList>
                <CommandEmpty>
                    <div className='grid gap-2 px-4'>
                        <p>Dodaj kategorię</p>
                        <Button
                            disabled={false}
                            variant='outline'
                            className='gap-1'
                            onClick={onAddCategory}
                        >
                            <Plus /> {categoryName}
                        </Button>
                    </div>
                </CommandEmpty>
                <CommandGroup>
                    {categories.map((category) => (
                        <CommandItem
                            key={category.id}
                            value={category.id}
                            onSelect={onSelectCategory}
                        >
                            {category.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
