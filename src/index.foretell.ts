import { errorPool, foretell_leyyoCommon } from "@leyyo/common";
import { FQN } from "./internal.js";
import { foretell_leyyoBuilder } from "@leyyo/builder";
import { foretell_leyyoEither } from "@leyyo/either";

// noinspection JSUnusedGlobalSymbols
export const foretell_leyyoEnveloper = [
  // dependencies
  ...foretell_leyyoCommon,
  ...foretell_leyyoBuilder,
  ...foretell_leyyoEither,

  () =>
    errorPool.register({
      name: "EnveloperError",
      fqn: FQN,
      i18n: true,
      emit: true,
      lazyTarget: import("./enveloper.error.js").then((m) => m.EnveloperError),
    }),
];
