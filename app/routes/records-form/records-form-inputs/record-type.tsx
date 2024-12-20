import { CircleDollarSign, HandCoins } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import type { RecordFormData, RecordType } from '../constants';

function RecordTypeTabs() {
    const { setValue } = useFormContext<RecordFormData>();

    const setRecordType = (recordType: RecordType) => {
        setValue('type', recordType);
    };

    return (
        <Tabs defaultValue='expense'>
            <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger
                    value='expense'
                    className='flex gap-2'
                    onClick={() => setRecordType('expense')}
                >
                    Wydatek <CircleDollarSign />
                </TabsTrigger>
                <TabsTrigger
                    value='income'
                    className='flex gap-2'
                    onClick={() => setRecordType('income')}
                >
                    Przychód <HandCoins />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export default RecordTypeTabs;
