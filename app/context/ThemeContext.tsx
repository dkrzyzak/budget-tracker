import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react';

export type Theme = 'light' | 'dark';
export type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>('dark');

    const toggleTheme = useCallback(() => {
        document.documentElement.classList.toggle('dark');
        setTheme((current) => (current === 'light' ? 'dark' : 'light'));
    }, []);

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
