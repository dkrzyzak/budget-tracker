import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setMatches(event.matches);
        }

        const result = matchMedia(query);
        result.addEventListener('change', onChange);
        setMatches(result.matches);

        return () => result.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}
