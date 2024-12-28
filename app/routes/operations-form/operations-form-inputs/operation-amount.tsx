import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/form/form-input';
import type { CreateOperationFormData } from '~/db/models';

export function OperationAmount() {
    const {
        register,
        formState: { errors },
    } = useFormContext<CreateOperationFormData>();

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
