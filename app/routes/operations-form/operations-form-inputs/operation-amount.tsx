import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/form/form-input';
import type { OperationFormData } from '~/db/models';

export function OperationAmount() {
    const {
        register,
        formState: { errors },
    } = useFormContext<OperationFormData>();

    return (
        <FormInput
            label='Kwota'
            id='amount'
            inputMode='decimal'
            error={errors?.amount}
            {...register('amount')}
        />
    );
}
