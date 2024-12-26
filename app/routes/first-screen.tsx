import { Link, type ActionFunction, type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import OperationsFormModal from './operations-form/operations-form-modal';
import { getCategoriesByUsage } from '~/db/services/categories';
import {createCategory} from '~/actions/categories/create';
import { promised } from '~/lib/utils';

export const meta: MetaFunction = () => {
    return [{ title: 'Billans' }, { name: 'description', content: 'Na co to poszło?' }];
};

export const loader = async () => {
    console.log('revalidation of main loader', Date.now());
    const [categories, categoriesError] = await promised(getCategoriesByUsage);


    if (categoriesError) {
        console.log("Error occurred: ", categoriesError);
    }

    return {
        categories: categoriesError ? [] : categories,
    };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

export const action: ActionFunction = async (args) => {
    return await createCategory(args);
}

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
