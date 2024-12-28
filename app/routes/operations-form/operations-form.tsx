import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OperationTypeTabs from './operations-form-inputs/operation-type';
import { initialData } from './constants';
import { OperationName } from './operations-form-inputs/operation-name';
import { OperationAmount } from './operations-form-inputs/operation-amount';
import { OperationSource } from './operations-form-inputs/operation-source';
import { OperationCategory } from './operations-form-inputs/operation-category';
import { createOperationFormParser, type CreateOperationFormData } from '~/db/models';
import { OperationDate } from './operations-form-inputs/operation-date';
import { Button } from '~/components/ui/button';
import { Form, useFetcher } from 'react-router';
import { toFormData } from '~/lib/utils/form-data';
// import { useAwaitedFetcher } from '~/hooks/use-awaited-fetcher';

function OperationsForm() {
    const form = useForm({
        defaultValues: initialData,
        resolver: zodResolver(createOperationFormParser),
    });

    const fetcher = useFetcher();

    const onSubmit: SubmitHandler<CreateOperationFormData> = async (data) => {
        const formData = toFormData(data);
        console.log(data, formData);
        await fetcher.submit(formData, { method: 'POST' });
    };

    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit, (errors) => void console.log('form was invalid', errors))}>
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

export default OperationsForm;
