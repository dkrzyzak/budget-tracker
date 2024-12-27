import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/form/form-input';
import type { Operation } from '~/db/models';

export function OperationAmount() {
    const {
        register,
        formState: { errors },
    } = useFormContext<Operation>();

    return (
        <FormInput
            label='Kwota'
            id='amount'
            inputMode='decimal'
            autoComplete='off'
            error={errors?.amount}
            {...register('amount')}
        />
    );
}
