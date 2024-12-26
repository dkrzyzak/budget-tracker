import type { ActionFunctionArgs } from 'react-router';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // DATABASE
            POSTGRES_URL?: string;
        }
    }

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
