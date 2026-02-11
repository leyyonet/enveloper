import {
    EnveloperConfigBuilder,
    EnveloperConfigExport,
    EnveloperConfigLike,
    OnOtherAnyFun,
    OnOtherAsyncFun,
    OnOtherFn
} from "./index.types";
import {Builder, BuilderAny} from "@leyyo/builder";
import {ClassLike, DeveloperError, isClass, testCase} from "@leyyo/common";
import {FQN, KEY_ENVELOPER_CONFIG} from "./internal";

class EnveloperConfig implements EnveloperConfigLike {
    private _knownList: Set<ClassLike> = new Set();
    private _ignoredList: Set<ClassLike> = new Set();
    ignored: ClassLike;
    known: ClassLike;
    onOther: OnOtherFn;
    onOtherAsync: OnOtherAnyFun;
    log: boolean = true;

    constructor() {
        this.onOther = (e) => e;
        this.onOtherAsync = async (e) => e;
    }

    builder(): BuilderAny<EnveloperConfigBuilder> {
        return Builder.build<EnveloperConfigBuilder>(this)
            .$setItem((k, v) => {
                switch (k) {
                    case "log":
                        if (typeof v !== 'boolean') {
                            throw new DeveloperError('Invalid boolean', testCase(FQN, 100));
                        }
                        this.log = v;
                        break;
                    case "ignored":
                        if ( !isClass(v)) {
                            throw new DeveloperError('Invalid class', testCase(FQN, 100));
                        }
                        this._ignoredList.add(v as ClassLike);
                        break;
                    case "known":
                        if ( !isClass(v)) {
                            throw new DeveloperError('Invalid class', testCase(FQN, 100));
                        }
                        this._knownList.add(v as ClassLike);
                        break;
                    case "onOther":
                        if (typeof v !== 'function' || isClass(v)) {
                            throw new DeveloperError('Invalid function', testCase(FQN, 100));
                        }
                        this.onOther = v as OnOtherFn;
                        break;
                    case "onOtherAsync":
                        if (typeof v !== 'function' || isClass(v)) {
                            throw new DeveloperError('Invalid function', testCase(FQN, 100));
                        }
                        this.onOtherAsync = v as OnOtherAsyncFun;
                        break;
                }
            });
    };

    fork(copyExisting?: boolean): EnveloperConfigLike {
        const ins = new EnveloperConfig();
        if (copyExisting) {
            ins.log = this.log;
            ins.onOther = this.onOther;
            ins.onOtherAsync = this.onOtherAsync;
            ins._knownList = new Set(Array.from(this._knownList));
            ins._ignoredList = new Set(Array.from(this._ignoredList));
        }
        return ins;
    }

    get all(): EnveloperConfigExport {
        const rec: EnveloperConfigExport = {
            log: this.log,
            onOther: this.onOther,
            onOtherAsync: this.onOtherAsync,
            ignoredList: Array.from(this._ignoredList.values()),
            knownList: Array.from(this._knownList.values()),
        };
        rec[KEY_ENVELOPER_CONFIG] = KEY_ENVELOPER_CONFIG;
        return rec;
    }
}

export const enveloperConfig: EnveloperConfigLike = new EnveloperConfig();
