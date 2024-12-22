export async function promised<AsyncFn extends (...args: any[]) => Promise<any>>(
    asyncFn: AsyncFn,
    ...asyncFnArgs: Parameters<AsyncFn>
): Promise<[Awaited<ReturnType<AsyncFn>>, null] | [null, Error]> {
    try {
        const result = await asyncFn(...asyncFnArgs);
        return [result, null];
    } catch (error: unknown) {
        return [null, error as Error];
    }
}

export async function promisedAction<AdditionalData = {}>(
    ...args: Parameters<typeof fetch>
): Promise<ActionResult<AdditionalData>> {
    try {
        const response = await fetch(...args);
        const actionResult = (await response.json()) as ActionResult<AdditionalData>;

        return actionResult;
    } catch (error: unknown) {
        return {
            success: false,
            message: (error as Error)?.message ?? 'Wystąpił nieoczekiwany błąd',
        } as ActionResult<AdditionalData>;
    }
}
