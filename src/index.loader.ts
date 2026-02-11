import {FQN} from "./internal";
import {defineLoader, loader_leyyoCommon} from "@leyyo/common";
import {enveloperConfig} from "./enveloper.config";

// noinspection JSUnusedGlobalSymbols
export const loader_leyyoAsl = defineLoader(FQN,
    // dependencies
    ...loader_leyyoCommon,

    // error
    () => import('./enveloper.error').then(m => m.EnveloperError),
    // instances
    () => import('./enveloper').then(m => m.enveloper),
    () => import('./enveloper.config').then(m => m.enveloperConfig),
);
