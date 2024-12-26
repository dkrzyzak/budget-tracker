import { useCallback, useState } from 'react';
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
import { type Operation, type CategoryWithUsage } from '~/db/models';
import { Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import type { LoaderData } from '~/routes/first-screen';

const NEW_CATEGORY_ID = -2;

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
                (category) => category.id !== NEW_CATEGORY_ID
            );

            return [
                ...newCategories,
                {
                    id: NEW_CATEGORY_ID,
                    name: categoryName,
                    operationsCount: 0,
                    color: '',
                    icon: '',
                },
            ];
        });
    }, []);

    if (isDesktop) {
        return (
            <div className='flex items-center gap-4'>
                <p className='text-sm'>Kategoria</p>
                <Popover open={isModalOpened} onOpenChange={setModalOpened}>
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
                        <CategoriesList categories={categories} addNewCategory={addNewCategory} setOpen={setModalOpened} />
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    return (
        <div className='flex items-center gap-4'>
            <p className='text-sm'>Kategoria</p>
            <Drawer open={isModalOpened} onOpenChange={setModalOpened}>
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
                        <CategoriesList categories={categories} addNewCategory={addNewCategory} setOpen={setModalOpened} />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

interface CategoriesListProps {
    setOpen: (open: boolean) => void;
    categories: CategoryWithUsage[],
    addNewCategory: (categoryName: string) => void;
}

function CategoriesList({ setOpen, categories, addNewCategory }: CategoriesListProps) {
    const [categoryName, setCategoryName] = useState('');
    const { setValue } = useFormContext<Operation>();

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(categoryName.toLowerCase().trim())
    );

    const onAddCategory = () => {
        addNewCategory(categoryName);
        setValue('categoryId', NEW_CATEGORY_ID);

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
