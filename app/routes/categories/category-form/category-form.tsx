import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryFormSchema, type CategoryFormData } from '~/db/models';
import { Button } from '~/components/ui/button';
import { Form } from 'react-router';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';
import { toast } from 'sonner';
import { FormInput } from '~/components/form/form-input';
import CategoryColorInput from './category-color-input';
import CategoryIconInput from './category-icon-input';
import { useItemsForm } from '~/context/items-manager';

function CategoryForm() {
    const { formDefaultValues, formMode, setModalOpen } =
        useItemsForm<CategoryFormData>();

    const form = useForm<CategoryFormData>({
        defaultValues: formDefaultValues,
        resolver: zodResolver(categoryFormSchema),
    });

    const { submit } = useAwaitedFetcher();

    const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        const { success, message } = await submit(data, {
            method: formMode === 'create' ? 'POST' : 'PUT',
        });

        if (!success) {
            return toast.error(message);
        }

        setModalOpen(false);
        toast.success(message);
    };

    return (
        <FormProvider {...form}>
            <Form
                onSubmit={form.handleSubmit(
                    onSubmit,
                    (errors) => void console.log('form was invalid', errors)
                )}
            >
                <div className='grid gap-4 py-2'>
                    <FormInput
                        label='Nazwa'
                        id='name'
                        error={form.formState.errors.name}
                        {...form.register('name')}
                    />

                    <CategoryColorInput />

                    <CategoryIconInput />

                    <Button className='w-auto' type='submit'>
                        Potwierdź
                    </Button>
                </div>
            </Form>
        </FormProvider>
    );
}

export default CategoryForm;
