import { FQN } from "./internal.js";
import { defineLoader, loader_leyyoCommon } from "@leyyo/common";
import { loader_leyyoBuilder } from "@leyyo/builder";
import { loader_leyyoEither } from "@leyyo/either";

// noinspection JSUnusedGlobalSymbols
export const loader_leyyoEnveloper = defineLoader(
  FQN,
  // dependencies
  ...loader_leyyoCommon,
  ...loader_leyyoBuilder,
  ...loader_leyyoEither,

  // error
  () => import("./enveloper.error.js").then((m) => m.EnveloperError),
  // instances
  () => import("./enveloper.js").then((m) => m.enveloper),
  () => import("./enveloper.config.js").then((m) => m.enveloperConfig),
);
