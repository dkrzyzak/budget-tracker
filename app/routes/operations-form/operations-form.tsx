import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OperationTypeTabs from './operations-form-inputs/operation-type';
import { initialData } from './constants';
import { OperationName } from './operations-form-inputs/operation-name';
import { OperationAmount } from './operations-form-inputs/operation-amount';
import { OperationSource } from './operations-form-inputs/operation-source';
import { OperationCategory } from './operations-form-inputs/operation-category';
import { operationSchema } from '~/db/models';

function OperationsForm() {
    const form = useForm({
        defaultValues: initialData,
        resolver: zodResolver(operationSchema),
    });

    return (
        <FormProvider {...form}>
            <div className='grid gap-4 py-2'>
                <OperationTypeTabs />
                <OperationAmount />
                <OperationName />
                <OperationCategory />
                <OperationSource />
            </div>
        </FormProvider>
    );
}

export default OperationsForm;
