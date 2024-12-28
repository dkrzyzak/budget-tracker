import { useFormContext } from 'react-hook-form';
import { DatePicker } from '~/components/form/date-picker';
import FormField from '~/components/form/form-field';
import type { Operation } from '~/db/models';

export function OperationDate() {
    const { setValue, watch } = useFormContext<Operation>();
    const date = watch('operationDate');

    const onChange = (date: Date) => {
        setValue('operationDate', date);
    };

    return (
        <FormField id='operation-date' label='Data transakcji'>
            <DatePicker
                id='operation-date'
                label='Data transakcji'
                value={date}
                onChange={onChange}
            />
        </FormField>
    );
}
