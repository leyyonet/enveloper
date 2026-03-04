import { definePredictor, errorPool } from "@leyyo/common";
import { PCK } from "../internal.js";

// noinspection JSUnusedGlobalSymbols
export const leyyoEnveloperPredictor = definePredictor(PCK)
  .dependency(
    () => import("@leyyo/common").then((m) => m.leyyoCommonPredictor),
    () => import("@leyyo/builder").then((m) => m.leyyoBuilderPredictor),
    () => import("@leyyo/either").then((m) => m.leyyoEitherPredictor),
  )
  // errors
  .add(() =>
    errorPool.lazy(
      PCK,
      "EnveloperError",
      import("../error/enveloper.error.js").then((m) => m.EnveloperError),
    ),
  )
  .end();
