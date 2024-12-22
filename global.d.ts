/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
    interface ProcessEnv {
        // DATABASE
        POSTGRES_URL?: string;
    }
}

type ActionResult = {
    success: boolean;
    message?: string;
};
