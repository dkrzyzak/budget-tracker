import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/form/form-input';
import type { Operation } from '~/db/models';

export function OperationName() {
    const { register } = useFormContext<Operation>();
    return <FormInput id='name' label='Nazwa' autoComplete='off' {...register('name')} />;
}
