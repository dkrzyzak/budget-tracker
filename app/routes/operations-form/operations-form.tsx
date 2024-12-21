import { useForm, FormProvider } from 'react-hook-form';
import OperationTypeTabs from './operations-form-inputs/operation-type';
import OperationSource from './operations-form-inputs/operation-source';
import { initialData } from './constants';
import OperationName from './operations-form-inputs/operation-name';

function OperationsForm() {
    const form = useForm({ defaultValues: initialData });

    return (
        <FormProvider {...form}>
            <div className='grid gap-4 py-2'>
                <OperationTypeTabs />
                <OperationName />

                <OperationSource />
            </div>
        </FormProvider>
    );
}

export default OperationsForm;
