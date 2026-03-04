import { packageJson } from "@leyyo/common";

export const { PCK } = packageJson(import.meta.url);
export const KEY_ENVELOPER_CONFIG = Symbol.for("leyyo:enveloper:config");
