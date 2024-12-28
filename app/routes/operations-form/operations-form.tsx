import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OperationTypeTabs from './operations-form-inputs/operation-type';
import { initialData } from './constants';
import { OperationName } from './operations-form-inputs/operation-name';
import { OperationAmount } from './operations-form-inputs/operation-amount';
import { OperationSource } from './operations-form-inputs/operation-source';
import { OperationCategory } from './operations-form-inputs/operation-category';
import { operationSchema } from '~/db/models';
import { OperationDate } from './operations-form-inputs/operation-date';
import { Button } from '~/components/ui/button';
import { Form } from 'react-router';

function OperationsForm() {
    const form = useForm({
        defaultValues: initialData,
        resolver: zodResolver(operationSchema),
    });

    return (
        <FormProvider {...form}>
            <Form
                onSubmit={form.handleSubmit(
                    (data) => {
                        console.log('form was valid', data);
                    },
                    (errors) => {
                        console.log('form was not valid:', errors);
                    }
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

export default OperationsForm;
