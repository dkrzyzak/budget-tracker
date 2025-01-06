import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { Form } from 'react-router';
import { toast } from 'sonner';

import { Button } from '~/components/ui/button';
import { useItemsForm } from '~/context/items-manager';
import { operationFormParser, type OperationFormData } from '~/db/models';
import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';
import { toFormData } from '~/lib/utils/form-data';

import { OperationAmount } from './operations-form-inputs/operation-amount';
import { OperationCategory } from './operations-form-inputs/operation-category';
import { OperationDate } from './operations-form-inputs/operation-date';
import { OperationName } from './operations-form-inputs/operation-name';
import { OperationSource } from './operations-form-inputs/operation-source';
import OperationTypeTabs from './operations-form-inputs/operation-type';

export function OperationsForm() {
    const { formDefaultValues, formMode, setModalOpen } =
        useItemsForm<OperationFormData>();

    const form = useForm({
        defaultValues: formDefaultValues,
        resolver: zodResolver(operationFormParser),
    });

    const { submit } = useAwaitedFetcher();

    const onSubmit: SubmitHandler<OperationFormData> = async (data) => {
        const formData = toFormData(data);
        const { success, message } = await submit(formData, {
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
                    <OperationTypeTabs />
                    <OperationName />
                    <OperationAmount />
                    <OperationDate />
                    <OperationCategory />
                    <OperationSource />
                    <Button className='w-auto' type='submit'>
                        Potwierdź
                    </Button>
                </div>
            </Form>
        </FormProvider>
    );
}
