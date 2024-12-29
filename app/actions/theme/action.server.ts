import type { ActionFunctionArgs } from 'react-router';
import { isValidThemeValue, themeCookie } from './index';

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const theme = formData.get('theme');

    if (isValidThemeValue(theme)) {
        return new Response(null, {
            status: 200,
            headers: {
                'Set-Cookie': await themeCookie.serialize(theme),
            },
        });
    }

    return new Response(
        JSON.stringify({
            message: 'Theme cookie was not set. Proper values are "dark" and "light".',
        })
    );
};
