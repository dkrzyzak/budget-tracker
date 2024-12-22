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
}

export {};
