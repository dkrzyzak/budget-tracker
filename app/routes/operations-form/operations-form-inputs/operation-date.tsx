import { useFormContext } from 'react-hook-form';
import { DatePicker } from '~/components/form/date-picker';
import type { Operation } from '~/db/models';

export function OperationDate() {
    const { setValue, watch } = useFormContext<Operation>();
    const date = watch('operationDate');

    const onChange = (date: Date) => {
        setValue('operationDate', date);
    };

    return <DatePicker label='Data transakcji' value={date} onChange={onChange} />;
}
