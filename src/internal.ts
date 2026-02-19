import { packageJson } from "@leyyo/common";

// noinspection JSUnusedGlobalSymbols
export const { name: NME, fqn: FQN, version: VER } = packageJson(import.meta.url);
export const KEY_ENVELOPER_CONFIG = Symbol.for("leyyo:enveloper:config");
