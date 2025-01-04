import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sourceFormSchema, type SourceFormData } from '~/db/models';
import { Button } from '~/components/ui/button';
import { Form } from 'react-router';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';
import { toast } from 'sonner';
import { FormInput } from '~/components/form/form-input';

export type FormMode = 'create' | 'edit';

interface SourceFormProps {
    defaultValues: SourceFormData;
    formMode: FormMode;
    setOpen: (open: boolean) => void;
}

function SourceForm({ defaultValues, formMode, setOpen }: SourceFormProps) {
    const form = useForm<SourceFormData>({
        defaultValues,
        resolver: zodResolver(sourceFormSchema),
    });

    const { submit } = useAwaitedFetcher();

    const onSubmit: SubmitHandler<SourceFormData> = async (data) => {
        const { success, message } = await submit(data, {
            method: formMode === 'create' ? 'POST' : 'PUT',
        });

        if (!success) {
            return toast.error(message);
        }

        setOpen(false);
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

                    <Button className='w-auto' type='submit'>
                        Potwierdź
                    </Button>
                </div>
            </Form>
        </FormProvider>
    );
}

export default SourceForm;
