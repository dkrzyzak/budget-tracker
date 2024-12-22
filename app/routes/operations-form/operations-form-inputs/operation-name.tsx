import { useFormContext } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { Operation } from '~/db/models';

function OperationName() {
    const { register } = useFormContext<Operation>();
    return (
        <div className='flex items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
                Nazwa
            </Label>
            <Input id='name' className='flex-1' {...register('name')} />
        </div>
    );
}

export default OperationName;
