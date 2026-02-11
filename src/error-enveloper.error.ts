import {KEY_ERROR_EMIT, KEY_ERROR_I18N, LeyyoError} from "@leyyo/common";

export class ErrorEnveloperError extends LeyyoError {

    /**
     * @param {string} method
     * @param {string} name
     * @param {boolean} isAsync
     * */
    constructor(method: string, name: string, isAsync?: boolean) {
        const asyncText = isAsync ? 'an async ' : 'a ';
        super(`${name} is not ${asyncText}function at ${method}`, {method, field: name, isAsync});
    }

    static {
        this[KEY_ERROR_I18N] = true;
        this[KEY_ERROR_EMIT] = true;
    }
}
