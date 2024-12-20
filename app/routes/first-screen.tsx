import { Link, type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import RecordsFormModal from './records-form/records-form-modal';

export const meta: MetaFunction = () => {
    return [{ title: 'Billans' }, { name: 'description', content: 'Na co to poszło?' }];
};

export default function FirstScreen() {
    return (
        <main className='h-screen flex flex-col'>
            <div className='flex justify-between p-4'>
                <RecordsFormModal />
                <Button asChild>
                    <Link to='/colors'>Login with Google</Link>
                </Button>
            </div>
            <div className='flex flex-col items-center justify-center flex-1 text-center mb-[20%]'>
                <h1 className='text-3xl'>Bilans</h1>
                <h2 className='text-2xl'>Na co to poszło?</h2>
            </div>
        </main>
    );
}
