import { useCallback, useState } from 'react';
import { type CreateOperationFormData } from '~/db/models';
import { NEW_OPTION_ID } from '~/lib/globals';
import { useFormContext } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import type { LoaderData } from '~/routes/first-screen';
import { ComboSelect } from '~/components/form/combo-select';
import FormField from '~/components/form/form-field';

export function OperationCategory() {
    const { categories: loadedCategories } = useLoaderData<LoaderData>();
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<CreateOperationFormData>();
    const selectedCategoryId = watch('categoryId');

    const [categories, setCategories] = useState(loadedCategories);
    const selectedCategory = categories.find(
        (category) => category.id === selectedCategoryId
    );

    const onSelectCategory = (categoryId: number, categoryName: string) => {
        setValue('categoryId', categoryId);
        setValue('categoryName', categoryName);
    };

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

    const targetLabel = selectedCategory ? selectedCategory.name : '+ Wybierz kategorię';

    return (
        <FormField id='category' label='Kategoria' error={errors.categoryId ?? errors.categoryName}>
            <ComboSelect
                options={categories}
                fieldId='category'
                targetLabel={targetLabel}
                emptyListLabel='Dodaj kategorię'
                addNewOption={addNewCategory}
                onSelectOption={onSelectCategory}
            />
        </FormField>
    );
}
