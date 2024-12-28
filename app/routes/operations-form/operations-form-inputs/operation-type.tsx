import { CircleDollarSign, HandCoins } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import type { CreateOperationFormData, OperationType } from '~/db/models';

function OperationTypeTabs() {
    const { setValue } = useFormContext<CreateOperationFormData>();

    const setOperationType = (operationType: OperationType) => {
        setValue('type', operationType);
    };

    return (
        <Tabs defaultValue='expense'>
            <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger
                    value='expense'
                    className='flex gap-2'
                    onClick={() => setOperationType('expense')}
                >
                    Wydatek <CircleDollarSign />
                </TabsTrigger>
                <TabsTrigger
                    value='income'
                    className='flex gap-2'
                    onClick={() => setOperationType('income')}
                >
                    Przychód <HandCoins />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export default OperationTypeTabs;
