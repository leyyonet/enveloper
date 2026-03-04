import { PCK } from "../internal.js";
import { defineLazy } from "@leyyo/common";

// noinspection JSUnusedGlobalSymbols
export const leyyoEnveloperLazy = defineLazy(PCK)
  .dependency(
    () => import("@leyyo/common").then((m) => m.leyyoCommonLazy),
    () => import("@leyyo/builder").then((m) => m.leyyoBuilderLazy),
    () => import("@leyyo/either").then((m) => m.leyyoEitherLazy),
  )
  .add(
    // error
    () => import("../error/enveloper.error.js").then((m) => m.EnveloperError),
    // instances
    () => import("../items/enveloper.js").then((m) => m.enveloper),
    () => import("../items/enveloper.config.js").then((m) => m.enveloperConfig),
  )
  .end();
