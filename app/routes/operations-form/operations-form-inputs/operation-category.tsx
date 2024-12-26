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
import { useLoaderData } from 'react-router';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';
import { toast } from 'sonner';
import type { CreateCategoryData } from '~/db/services/categories';

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
    const { categories } = useLoaderData<{ categories: CategoryDto[] }>();
    const [categoryName, setCategoryName] = useState('');
    const { setValue } = useFormContext<Operation>();
    const { submit } = useAwaitedFetcher<CreateCategoryData>();

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(categoryName.toLowerCase().trim())
    );

    const onAddCategory = async () => {
        const formData = new FormData();
        formData.append('categoryName', categoryName);

        const { success, message, id } = await submit(formData, { method: 'POST' });

        if (!success) {
            toast.error(message);
        }

        // set as a value in the form, after updating the db and receiving updated categories list
        setValue('categoryId', id ?? -1);

        // close combobox
        setOpen(false);
    };

    const onSelectCategory = (value: string) => {
        setValue('categoryId', Number(value));
        setOpen(false);
    };

    return (
        <Command shouldFilter={false}>
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
                    {filteredCategories.map((category) => (
                        <CommandItem
                            key={category.id}
                            value={String(category.id)}
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
