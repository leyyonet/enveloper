import {FQN} from "./internal";
import {defineLoader, loader_leyyoCommon} from "@leyyo/common";

// noinspection JSUnusedGlobalSymbols
export const loader_leyyoEnveloper = defineLoader(FQN,
    // dependencies
    ...loader_leyyoCommon,

    // error
    () => import('./enveloper.error').then(m => m.EnveloperError),
    // instances
    () => import('./enveloper').then(m => m.enveloper),
    () => import('./enveloper.config').then(m => m.enveloperConfig),
);
