import {
    Link,
    type LoaderFunction,
    type MetaFunction,
    type ShouldRevalidateFunction,
} from 'react-router';
import { Button } from '~/components/ui/button';
import OperationsFormModal from './operations-form/operations-form-modal';
import { getCategories } from '~/db/services/categories';

export const meta: MetaFunction = () => {
    return [{ title: 'Billans' }, { name: 'description', content: 'Na co to poszło?' }];
};

export const shouldRevalidate: ShouldRevalidateFunction = (data) => {
    console.log('in main route', data);
    return true;
};

export const loader: LoaderFunction = async () => {
    console.log('revalidation of main loader');
    const categories = await getCategories();

    return {
        categories,
    };
};

export default function FirstScreen() {
    return (
        <main className='h-screen flex flex-col'>
            <div className='flex justify-between p-4'>
                <OperationsFormModal />
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
