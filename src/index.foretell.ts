import {errorPool, foretell_leyyoCommon} from "@leyyo/common";
import {FQN} from "./internal";

// noinspection JSUnusedGlobalSymbols
export const foretell_leyyoEnveloper = [
    // dependencies
    ...foretell_leyyoCommon,

    () => errorPool.register({
            name: 'EnveloperError',
            fqn: FQN,
            i18n: true,
            emit: true,
            lazyTarget: import('./enveloper.error').then(m => m.EnveloperError)
        }
    ),
];
