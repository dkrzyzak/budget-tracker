import { useFormContext } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { Operation } from '~/db/models';

function OperationSource() {
    // TODO: 1. operować na IDach sourców z bazy danych (-1 == nowy)
    // TODO: 2 dodać tutaj prosty formularz dodawania nowego id (combobox?)
    const { watch, register } = useFormContext<Operation>();
    const operationType = watch('type');

    return (
        <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='sourceId' className='text-right'>
                {operationType === 'expense' ? 'Do' : 'Od'}
            </Label>
            <Input id='sourceId' className='col-span-3' {...register('sourceId')} />
        </div>
    );
}

export default OperationSource;
