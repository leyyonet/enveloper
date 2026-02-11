import {
    DummyAsyncFun,
    DummyFun, EnveloperConfigExport, EnveloperConfigLike,
    ErrorEnveloperLike,
    OnErrorAnyFun, OnErrorFun,
    OnOtherAnyFun, OnOtherFun
} from "./index.types";
import {Either} from "@leyyo/either";
import {EnveloperError} from "./enveloper.error";
import {enveloperConfig} from "./enveloper.config";
import {
    Async,
    ClassLike,
    DeveloperError,
    Fnc,
    isFilledObj,
    isText,
    logCommon,
    Logger,
    testCase
} from "@leyyo/common";
import {FQN, KEY_ENVELOPER_CONFIG} from "./internal";

class ErrorEnveloper implements ErrorEnveloperLike {
    private _config: EnveloperConfigExport;
    private logger: Logger;

    constructor(name?: string) {
        if (!isText(name)) {
            name = '';
        }
        else {
            name = '#' + name;
        }
        this._config = enveloperConfig.all;
        this.logger = logCommon.of('ErrorEnveloper' + name);
    }
    protected logIt(method: string, e: Error, log: boolean): void {
        if (log ?? this._config.log) {
            this.logger.error(e, {method});
        }
    }

    private _inErrorList(err: Error, classes: Array<ClassLike>): Error | undefined {
        for (const clazz of classes) {
            if (err instanceof clazz) {
                return err;
            }
        }
        return undefined;
    }

    /** @inheritDoc */
    clearConfig(): ErrorEnveloperLike {
        this._config = enveloperConfig.all;
        return this;
    }

    /** @inheritDoc */
    fork(name?: string): ErrorEnveloperLike {
        return new ErrorEnveloper();
    }

    /** @inheritDoc */
    attachConfig(config: EnveloperConfigLike): ErrorEnveloperLike {
        if (!isFilledObj(config)) {
            throw new DeveloperError('Invalid config', testCase(FQN, 100), 'ErrorEnveloper');
        }
        if (!isFilledObj(config.all)) {
            throw new DeveloperError('Invalid config', testCase(FQN, 101), 'ErrorEnveloper');
        }
        if (config.all[KEY_ENVELOPER_CONFIG] !== KEY_ENVELOPER_CONFIG) {
            throw new DeveloperError('Invalid config', testCase(FQN, 102), 'ErrorEnveloper');
        }
        this._config = config.all;
        return this;
    }

    // region swallow

    /** {@inheritDoc} */
    swallow<T>(callback: Fnc<T>, def?: T, log?: boolean): T {
        if (typeof callback !== 'function') {
            throw new EnveloperError('swallow', 'callback');
        }
        try {
            return callback();
        } catch (e) {
            if (!this._inErrorList(e, this._config.ignoredList)) {
                this.logIt('swallow', e, log);
            }
            return def;
        }
    }

    /** {@inheritDoc} */
    async swallowAsync<T>(callback: Async<T>, def?: T, log?: boolean): Promise<T> {
        if (typeof callback !== 'function') {
            throw new EnveloperError('swallowAsync', 'callback', true);
        }
        try {
            return await callback();
        } catch (e) {
            if (!this._inErrorList(e, this._config.ignoredList)) {
                this.logIt('swallowAsync', e, log);
            }
            return def;
        }
    }
    // endregion swallow

    // region handle
    /** @inheritDoc */
    handle<T>(callback: Fnc<T>, onError: OnErrorFun<T>, def?: T, log?: boolean): T {
        if (typeof callback !== 'function') {
            throw new EnveloperError('handle', 'callback');
        }
        if (typeof onError !== 'function') {
            throw new EnveloperError('handle', 'onError');
        }
        try {
            return callback();
        } catch (e) {
            if (!this._inErrorList(e, this._config.ignoredList)) {
                this.logIt('handle', e, log);
            }
            return this.swallow(() => onError(e), def, log);
        }
    }

    /** @inheritDoc */
    async handleAsync<T>(callback: Async<T>, onError: OnErrorAnyFun<T>, def?: T, log?: boolean): Promise<T> {
        if (typeof callback !== 'function') {
            throw new EnveloperError('handleAsync', 'callback');
        }
        if (typeof onError !== 'function') {
            throw new EnveloperError('handleAsync', 'onError');
        }
        try {
            return await callback();
        } catch (e) {
            if (!this._inErrorList(e, this._config.ignoredList)) {
                this.logIt('handleAsync', e, log);
            }
            return this.swallowAsync((async () => onError(e)) as Async<T>, def, log);
        }
    }
    // endregion handle

    // region ignore
    /** @inheritDoc */
    ignore(callback: DummyFun, log?: boolean): void {
        try {
            callback();
        } catch (e) {
            if (!this._inErrorList(e, this._config.ignoredList)) {
                this.logIt('ignore', e, log);
            }
        }
    }
    /** @inheritDoc */
    async ignoreAsync(callback: DummyAsyncFun, log?: boolean): Promise<void> {
        try {
            await callback();
        } catch (e) {
            if (!this._inErrorList(e, this._config.ignoredList)) {
                this.logIt('ignoreAsync', e, log);
            }
        }
    }
    // endregion ignore


    // region propagate
    /** @inheritDoc */
    propagate<T>(callback: Fnc<T>, onOther?: OnOtherFun, def?: T): T {
        try {
            return callback();
        } catch (e) {
            if (this._inErrorList(e, this._config.ignoredList)) {
                return def;
            }
            if (this._inErrorList(e, this._config.knownList)) {
                throw e;
            }
            if (typeof onOther === 'function') {
                throw onOther(e);
            }
            throw this._config.onOther(e);
        }
    }

    /** @inheritDoc */
    async propagateAsync<T>(callback: Async<T>, onOther?: OnOtherAnyFun, def?: T): Promise<T> {
        try {
            return await callback();
        } catch (e) {
            if (this._inErrorList(e, this._config.ignoredList)) {
                return def;
            }
            if (this._inErrorList(e, this._config.knownList)) {
                throw e;
            }
            if (typeof onOther === 'function') {
                throw await onOther(e);
            }
            throw await this._config.onOtherAsync(e);
        }
    }
    // endregion propagate

    // region either
    /** @inheritDoc */
    either<T, E extends Error>(callback: Fnc<T>): Either<T, E> {
        try {
            return Either.first(callback()) as Either<T, E>;
        } catch (e) {
            return Either.second(e) as Either<T, E>;
        }
    }

    /** @inheritDoc */
    async eitherAsync<T, E extends Error>(callback: Async<T>): Promise<Either<T, E>> {
        try {
            return Either.first(await callback()) as Either<T, E>;
        } catch (e) {
            return Either.second(e) as Either<T, E>;
        }
    }
    // endregion either
}
export const errorEnveloper:ErrorEnveloperLike = new ErrorEnveloper();
// noinspection JSUnusedGlobalSymbols
export const enveloper = errorEnveloper; // just alias
