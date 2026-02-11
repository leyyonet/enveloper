import {Either} from "@leyyo/either";
import {Async, ClassLike, Fnc} from "@leyyo/common";
import {BuilderAny} from "@leyyo/builder";

export type DummyFun = () => unknown;
export type DummyAsyncFun = () => Promise<unknown>;

export type OnErrorFun<T> = (e?: Error) => T;
export type OnErrorAsyncFun<T> = (e?: Error) => Promise<T>;
export type OnErrorAnyFun<T> = OnErrorFun<T> | OnErrorAsyncFun<T>;

export type OnOtherFn = (e?: Error) => Error;
export type OnOtherFun = (e?: Error) => Error;
export type OnOtherAsyncFun = (e?: Error) => Promise<Error>;
export type OnOtherAnyFun = OnOtherFun | OnOtherAsyncFun;

export interface EnveloperConfigLike {
    log: boolean;
    ignored: ClassLike;
    known: ClassLike;
    onOther: OnOtherFn;
    onOtherAsync: OnOtherAnyFun;

    builder(): BuilderAny<EnveloperConfigBuilder>;

    fork(copyExisting?: boolean): EnveloperConfigLike;

    get all(): EnveloperConfigExport;
}

export type EnveloperConfigBuilder = Omit<EnveloperConfigLike, 'builder' | 'all' | 'fork'>;

export interface EnveloperConfigExport {
    log: boolean;
    ignoredList: Array<ClassLike>;
    knownList: Array<ClassLike>;
    onOther: OnOtherFn;
    onOtherAsync: OnOtherAnyFun;
}

export interface ErrorEnveloperLike {
    /**
     * Attach config to current enveloper
     *
     * @param {EnveloperConfigLike} config
     * */
    attachConfig(config: EnveloperConfigLike): ErrorEnveloperLike;

    /**
     * Clear config, switch to default config
     * */
    clearConfig(): ErrorEnveloperLike;

    /**
     * Fork (clone) current enveloper
     *
     * @param {string} name - name for only logging purpose
     * */
    fork(name?: string): ErrorEnveloperLike;

    // region swallow
    /**
     * Swallows an error condition for sync callback
     *
     * @param {function} callback - callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if `callback` fails
     * */
    swallow<T>(callback: Fnc<T>): T | undefined;

    /**
     * Swallows error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {any} def - default value when error occurred
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - `default` if `callback` fails
     * */
    swallow<T>(callback: Fnc<T>, def: T): T;

    /**
     * Swallows an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {any} def - default value when error occurred
     * @param {boolean} log - prints error message
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - `default` if `callback` fails
     * */
    swallow<T>(callback: Fnc<T>, def: T, log: boolean): T;

    /**
     * Swallows an error condition for async callback
     *
     * @param {function} callback - callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if `callback` fails
     * */
    swallowAsync<T>(callback: Async<T>): Promise<T | undefined>;

    /**
     * Swallows an error condition for async callback
     *
     * @param {function} callback - callback
     * @param {any} def - default value when error occurred
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - `default` if `callback` fails
     * */
    swallowAsync<T>(callback: Async<T>, def: T): Promise<T>;

    /**
     * Swallows an error condition for async callback
     *
     * @param {function} callback - callback
     * @param {any} def - default value when error occurred
     * @param {boolean} log - prints error message
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - `default` if `callback` fails
     * */
    swallowAsync<T>(callback: Async<T>, def: T, log: boolean): Promise<T>;

    // endregion swallow


    // region handle
    /**
     * Handles an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {function} onError - on error callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - response of `onError` if `callback` fails and `onError` runs
     * @returns {undefined} - if `callback` and `onError` fail
     * */
    handle<T>(callback: Fnc<T>, onError: OnErrorFun<T>): T;

    /**
     * Handles an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {function} onError - on error callback
     * @param {any} def - default value when error occurred
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - response of `onError` if `callback` fails and `onError` runs
     * @returns {any} - `default` if `callback` and `onError` fail
     * */
    handle<T>(callback: Fnc<T>, onError: OnErrorFun<T>, def: T): T;

    /**
     * Handles an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {function} onError - on error callback
     * @param {any} def - default value when error occurred
     * @param {boolean} log - prints error message
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - response of `onError` if `callback` fails and `onError` runs
     * @returns {any} - `default` if `callback` and `onError` fail
     * */
    handle<T>(callback: Fnc<T>, onError: OnErrorFun<T>, def: T, log: boolean): T;

    /**
     * Handles an error condition for async callback
     *
     * @param {function} callback - callback
     * @param {function} onError - on error callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - response of `onError` if `callback` fails and `onError` runs
     * @returns {undefined} - if `callback` and `onError` fail
     * */
    handleAsync<T>(callback: Async<T>, onError: OnErrorAnyFun<T>): Promise<T>;

    /**
     * Handles an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {function} onError - on error callback
     * @param {any} def - default value when error occurred
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - response of `onError` if `callback` fails and `onError` runs
     * @returns {any} - `default` if `callback` and `onError` fail
     * */
    handleAsync<T>(callback: Async<T>, onError: OnErrorAnyFun<T>, def: T): Promise<T>;

    /**
     * Handles an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {function} onError - on error callback
     * @param {any} def - default value when error occurred
     * @param {boolean} log - prints error message
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - response of `onError` if `callback` fails and `onError` runs
     * @returns {any} - `default` if `callback` and `onError` fail
     * */
    handleAsync<T>(callback: Async<T>, onError: OnErrorAnyFun<T>, def: T, log: boolean): Promise<T>;

    // endregion handle

    // region ignore
    /**
     * Ignores an error condition for sync callback
     *
     * @param {function} callback - callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if `callback` fails
     * */
    ignore(callback: DummyFun): void;

    /**
     * Ignores an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {boolean} log - prints error message
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if `callback` fails
     * */
    ignore(callback: DummyFun, log: boolean): void;

    /**
     * Ignores an error condition for sync callback
     *
     * @param {function} callback - callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if `callback` fails
     * */
    ignoreAsync(callback: DummyAsyncFun): Promise<void>;

    /**
     * Ignores an error condition for async callback
     *
     * @param {function} callback - callback
     * @param {boolean} log - prints error message
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if `callback` fails
     * */
    ignoreAsync(callback: DummyAsyncFun, log: boolean): Promise<void>;

    // endregion ignore


    // region propagate
    /**
     * Propagates an error condition for sync callback
     *
     * @param {function} callback - callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if error is in ignored errors, it will be ignored
     * @throws {Error} - else if error is in known errors, it will be thrown
     * @throws {Error} - else, default error will be thrown
     * */
    propagate<T>(callback: Fnc<T>): T;

    /**
     * Propagates an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {function} onOther - new error generator callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if error is in ignored errors, it will be ignored
     * @throws {Error} - else if error is in known errors, it will be thrown
     * @throws {Error} - else, response of `onOther` will be thrown
     * */
    propagate<T>(callback: Fnc<T>, onOther: OnOtherFun): T;

    /**
     * Propagates an error condition for sync callback
     *
     * @param {function} callback - callback
     * @param {function} onOther - new error generator callback
     * @param {any} def - default value
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - `default` if error is in ignored errors, it will be ignored and default will be returned
     * @throws {Error} - else if error is in known errors, it will be thrown
     * @throws {Error} - else, response of `onOther` will be thrown
     * */
    propagate<T>(callback: Fnc<T>, onOther: OnOtherFun, def: T): T;

    /**
     * Propagates an error condition for async callback
     *
     * @param {function} callback - callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if error is in ignored errors, it will be ignored
     * @throws {Error} - else if error is in known errors, it will be thrown
     * @throws {Error} - else, default error will be thrown
     * */
    propagateAsync<T>(callback: Async<T>): Promise<T>;

    /**
     * Propagates an error condition for async callback
     *
     * @param {function} callback - callback
     * @param {function} onOther - new error generator callback
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {undefined} - if error is in ignored errors, it will be ignored
     * @throws {Error} - else if error is in known errors, it will be thrown
     * @throws {Error} - else, response of `onOther` will be thrown
     * */
    propagateAsync<T>(callback: Async<T>, onOther: OnOtherAnyFun): Promise<T>;

    /**
     * Propagates an error condition for ssync callback
     *
     * @param {function} callback - callback
     * @param {function} onOther - new error generator callback
     * @param {any} def - default value
     *
     * @returns {any} - response of `callback` if `callback` runs
     * @returns {any} - `default` if error is in ignored errors, it will be ignored and default will be returned
     * @throws {Error} - else if error is in known errors, it will be thrown
     * @throws {Error} - else, response of `onOther` will be thrown
     * */
    propagateAsync<T>(callback: Async<T>, onOther: OnOtherAnyFun, def: T): Promise<T>;

    // endregion propagate

    // region either

    /**
     * Returns an either (first: result, second: error) for sync callback
     *
     * @param {function} callback - callback
     *
     * @returns {Either} - {isFirst: true, first: response of `callback`}, if `callback` runs
     * @returns {Either} - {isSecond: true, second: Error}, if `callback` fails
     * */
    either<T, E extends Error>(callback: Fnc<T>): Either<T, E>;

    /**
     * Returns an either (first: result, second: error) for async callback
     *
     * @param {function} callback - callback
     *
     * @returns {Either} - {isFirst: true, first: response of `callback`}, if `callback` runs
     * @returns {Either} - {isSecond: true, second: Error}, if `callback` fails
     * */
    eitherAsync<T, E extends Error>(callback: Async<T>): Promise<Either<T, E>>;

    // endregion either


}
