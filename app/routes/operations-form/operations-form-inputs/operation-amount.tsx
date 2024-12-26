import { useFormContext } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { Operation } from '~/db/models';

export function OperationAmount() {
    const { register } = useFormContext<Operation>();

    return (
        <div className='flex items-center gap-4'>
            <Label htmlFor='amount' className='text-right'>
                Kwota
            </Label>
            <Input
                id='amount'
                className='flex-1'
                inputMode='decimal'
                autoComplete='off'
                {...register('amount')}
            />
        </div>
    );
}
