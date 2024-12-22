import type { ActionFunction } from 'react-router';
import { addCategory } from '~/db/services/categories';

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('categoryName') as string | null;

    console.log('got action called with ', formData);

    if (!name) {
        throw new Response('Missing categoryName parameter in form data', {
            status: 400,
        });
    }

    try {
        await addCategory(name);

        return new Response(null, { status: 201 });
    } catch (e) {
        console.log(e);

        throw new Response('Error while adding to the database', { status: 500 });
    }
};
