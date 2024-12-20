import { useForm, FormProvider } from 'react-hook-form';
import RecordTypeTabs from './records-form-inputs/record-type';
import RecordSource from './records-form-inputs/record-source';
import { initialData } from './constants';
import RecordName from './records-form-inputs/record-name';

function RecordsForm() {
    const form = useForm({ defaultValues: initialData });

    return (
        <FormProvider {...form}>
            <div className='grid gap-4 py-2'>
                <RecordTypeTabs />
                <RecordName />

                <RecordSource />
            </div>
        </FormProvider>
    );
}

export default RecordsForm;
