import { useFormContext } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { OperationFormData } from '../constants';

function OperationSource() {
    const { watch, register } = useFormContext<OperationFormData>();
    const operationType = watch('type');

    return (
        <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='source' className='text-right'>
                {operationType === 'expense' ? 'Do' : 'Od'}
            </Label>
            <Input id='source' className='col-span-3' {...register('source')} />
        </div>
    );
}

export default OperationSource;
