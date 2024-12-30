import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { initialData } from './constants';
import { categoryFormSchema, type CategoryFormData } from '~/db/models';
import { Button } from '~/components/ui/button';
import { Form } from 'react-router';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';
import { toast } from 'sonner';
import { FormInput } from '~/components/form/form-input';
import CategoryColorInput from './category-color-input';

interface CategoryFormProps {
    setOpen: (open: boolean) => void;
}

function CategoryForm({ setOpen }: CategoryFormProps) {
    const form = useForm<CategoryFormData>({
        defaultValues: initialData,
        resolver: zodResolver(categoryFormSchema),
    });

    const { submit } = useAwaitedFetcher();

    const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        const { success, message } = await submit(data, { method: 'POST' });

        if (!success) {
            return toast.error(message);
        }

        setOpen(false);
        toast.success('Utworzono nową kategorię!');
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

                    <FormInput
                        label='Ikonka'
                        id='icon'
                        error={form.formState.errors.icon}
                        {...form.register('icon')}
                    />

                    <Button className='w-auto' type='submit'>
                        Potwierdź
                    </Button>
                </div>
            </Form>
        </FormProvider>
    );
}

export default CategoryForm;
