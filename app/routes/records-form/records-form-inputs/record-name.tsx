import { useFormContext } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { type RecordFormData } from '../constants';

function RecordName() {
    const { register } = useFormContext<RecordFormData>();
    return (
        <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
                Nazwa
            </Label>
            <Input id='name' className='col-span-3' {...register('name')} />
        </div>
    );
}

export default RecordName;
