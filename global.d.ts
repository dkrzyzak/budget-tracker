import type { ForwardRefExoticComponent } from 'react';
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

    type Maybe<T> = T | null | undefined;

    type AnyObject = Record<string, any>;

    type ActionResult<AdditionalData = {}> = {
        success: boolean;
        message: string;
    } & AdditionalData;

    interface ActionFunction<AdditionalData = {}> {
        (
            args: ActionFunctionArgs,
            handlerCtx?: unknown
        ): Promise<ActionResult<AdditionalData>>;
    }

    type ExtractForwardRefProps<T> = T extends ForwardRefExoticComponent<infer P> ? P : T;
}

export {};
