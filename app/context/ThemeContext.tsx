import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react';
import { useFetcher } from 'react-router';
import type { Theme } from '~/actions/theme';

export type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => {},
});

export const ThemeProvider = ({
    children,
    defaultTheme,
}: PropsWithChildren<{ defaultTheme: Theme }>) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const fetcher = useFetcher();

    const toggleTheme = useCallback(() => {
        document.documentElement.classList.toggle('dark');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        fetcher.submit({ theme: newTheme }, { method: 'POST', action: '/api/set-theme' });
    }, [theme, fetcher]);

    const contextValue: ThemeContextValue = useMemo(
        () => ({
            theme,
            toggleTheme,
        }),
        [theme, toggleTheme]
    );

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
    return useContext(ThemeContext);
}
