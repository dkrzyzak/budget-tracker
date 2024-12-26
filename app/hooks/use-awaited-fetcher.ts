import { useCallback, useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';

export function useAwaitedFetcher<AdditionalData = {}>() {
    type Data = ActionResult<AdditionalData>;
    const fetcher = useFetcher<Data>();

    const pendingSubmissionRef = useRef(false);
    const promiseRef = useRef<{
        resolve: (value: Data) => void;
        reject: (reason?: Data) => void;
    } | null>(null);

    useEffect(() => {
        // prettier-ignore
        if (pendingSubmissionRef.current && fetcher.data && promiseRef.current) {
            promiseRef.current.resolve(fetcher.data as Data);
            pendingSubmissionRef.current = false;
            promiseRef.current = null;
        }
    }, [fetcher.data]);

    useEffect(() => {
        // prettier-ignore
        if (pendingSubmissionRef.current && !fetcher.data && fetcher.state === 'idle' && promiseRef.current) {
            promiseRef.current.reject({ success: false, message: 'Fetcher zrobił reject' } as Data);
            pendingSubmissionRef.current = false;
            promiseRef.current = null;
        }
    }, [fetcher.data, fetcher.state]);

    const submit = useCallback(
        (...args: Parameters<typeof fetcher.submit>) => {
            return new Promise<Data>((resolve, reject) => {
                pendingSubmissionRef.current = true;
                promiseRef.current = { resolve, reject };
                fetcher.submit(...args);
            });
        },
        [fetcher]
    );

    return { submit, fetcher };
}