import type { ActionFunctionArgs } from 'react-router';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // DATABASE
            POSTGRES_URL?: string;
        }
    }

    type Pretty<T> = {
        [K in keyof T]: T[K];
    } & {};

    type ActionResult<AdditionalData = {}> = {
        success: boolean;
        message?: string;
    } & AdditionalData;

    interface ActionFunction<AdditionalData = {}> {
        (
            args: ActionFunctionArgs,
            handlerCtx?: unknown
        ): Promise<ActionResult<AdditionalData>>;
    }
}

export {};
