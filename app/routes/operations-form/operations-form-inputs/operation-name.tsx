import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/form/form-input';
import type { OperationFormData } from '~/db/models';

export function OperationName() {
    const { register } = useFormContext<OperationFormData>();
    return <FormInput id='name' label='Nazwa' {...register('name')} />;
}
