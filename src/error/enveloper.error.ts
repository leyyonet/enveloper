import {
  KEY_ERROR_DEFAULT_MESSAGE,
  KEY_ERROR_EMIT,
  KEY_ERROR_I18N,
  KEY_FQN_PACKAGE,
  LeyyoError,
} from "@leyyo/common";
import { PCK } from "../internal.js";

export class EnveloperError extends LeyyoError {
  /**
   * @param {string} method
   * @param {string} name
   * @param {boolean} isAsync
   * */
  constructor(method: string, name: string, isAsync?: boolean) {
    const asyncText = isAsync ? "an async " : "a ";
    super(`${name} is not ${asyncText}function at ${method}`, { method, field: name, isAsync });
  }

  static {
    this[KEY_FQN_PACKAGE] = PCK;
    this[KEY_ERROR_DEFAULT_MESSAGE] = "Enveloper error";
    this[KEY_ERROR_EMIT] = true;
    this[KEY_ERROR_I18N] = true;
  }
}
