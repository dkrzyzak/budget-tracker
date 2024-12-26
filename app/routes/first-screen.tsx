import { Link, type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import OperationsFormTrigger from './operations-form/operations-form-trigger';
import { getCategoriesByUsage } from '~/db/services/categories';
import { promised } from '~/lib/utils';
import { getSourcesByFrequency } from '~/db/services/sources/getSource';

export const meta: MetaFunction = () => {
    return [{ title: 'Billans' }, { name: 'description', content: 'Na co to poszło?' }];
};

export const loader = async () => {
    const [categories, categoriesError] = await promised(getCategoriesByUsage);
    const [sources, sourcesError] = await promised(getSourcesByFrequency);

    if (categoriesError) {
        console.log("Couldn't load categories: ", categoriesError);
    }

    if (sourcesError) {
        console.log("Couldn't load sources: ", sourcesError);
    }

    return {
        categories: categoriesError ? [] : categories,
        sources: sourcesError ? [] : sources,
    };
};

export type LoaderData = Awaited<ReturnType<typeof loader>>;

// export const action: ActionFunction = async ({ request }) => {

//     return { success: true };
// }

export default function FirstScreen() {
    return (
        <main className='h-screen flex flex-col'>
            <div className='flex justify-between p-4'>
                <OperationsFormTrigger />
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
