import { createCookie } from 'react-router';

export type Theme = 'dark' | 'light';

export const themeCookieName = 'theme';

export const isValidThemeValue = (value: any): value is Theme =>
    value === 'dark' || value === 'light';

export const themeCookie = createCookie(themeCookieName, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
    sameSite: 'lax',
});

export async function parseThemeCookie(request: Request): Promise<Theme> {
    const cookies = request.headers.get('cookie');
    const parsedTheme = await themeCookie.parse(cookies);

    if (isValidThemeValue(parsedTheme)) {
        return parsedTheme;
    }

    console.log('setting default theme to dark');
    return 'dark';
}
