# Leyyo: Error Enveloper
> Error enveloper in order to use the necessity to a try...catch block.
> 

## Import
- `npm i @leyyo/enveloper`

## Usage

### Swallow (ignore any error) in a callback
```typescript
interface EnveloperLike {
    // ...
    swallow<T>(callback: () => T, def?: T, log?: boolean): T;
    swallowAsync<T>(callback: () => Promise<T>, def?: T, log?: boolean): Promise<T>;
    // ...
}
```
```typescript
import {enveloper} from "./enveloper";
let result;
// handle a callback with default value
// if callback throws and error then ignore it, and return default value 
result = enveloper.swallow(() => throw new Error('Ignored'), 5);
// result: 5

// handle a callback without any return
// if callback throws and error then ignore it 
enveloper.swallow(() => throw new Error('Ignored'));
// no exception

// it also supports async callbacks
result = await enveloper.swallowAsync(/* ... */); // with return
await enveloper.swallowAsync(/* ... */); // without return
```

### Handle (evaluate raised error in your code block) in a callback
```typescript
interface EnveloperLike {
    // ...
    handle<T>(callback: () => T, onError: (e: Error) => T, def?: T, log?: boolean): T;
    handleAsync<T>(callback: () => Promise<T>, onError: (e: Error) => Promise<T>, def?: T, log?: boolean): Promise<T>;
    // ...
}
```
```typescript
import {enveloper} from "./enveloper";
let result;
// handle a callback with default value
// if callback throws and error then ignore it, and return default value 
result = enveloper.handle(
    () => {
        /* your code blocks */
        return 1;
    },
    e => { // e is raised in your code block
        // this code block should not raise any error, otherwise it will be ignored
        if (e instanceof DbError) {
            // ...
        }
        return 2;
    }, 5);
// result:
// - 1 if your code block does not throw any error
// - 2 if your code block throws and error and your evaluation block handles it successfully
// - 5 if your error evaluation raised an unexpected error

// handle a callback without any return
// if callback throws and error then ignore it 
result = enveloper.handle(
    () => {
        /* your code blocks */
    },
    e => { // e is raised in your code block
        // this code block should not raise any error, otherwise it will be ignored
        if (e instanceof DbError) {
            // ...
        }
    });
// no exception

// it also supports async callbacks
result = await enveloper.handleAsync(/* ... */); // with return
await enveloper.handleAsync(/* ... */); // without return
```
### Todo (usage)
- ignore @todo
- propagate @todo
- either @todo
- config - log @todo
- config - ignoredErrors @todo
- config - knownErrors @todo
- config - onOther Func @todo

## Blueprint

### Items
| Type        | Name                                                               | FQN             | Description |
|-------------|--------------------------------------------------------------------|-----------------|-------------|
| `instance`  | [enveloper](src/items/enveloper.ts)                                | `f`             | enveloper   |
| `instance`  | [enveloperConfig](src/items/enveloper.config.ts)                   | `f`             | config      |
| `error`     | [EnveloperError](src/error/enveloper.error.ts)                     | `f` `p` `e` `i` |             |
| `predictor` | [leyyoEnveloperPredictor](src/loader/leyyo-enveloper-predictor.ts) |                 |             |
| `lazy`      | [leyyoEnveloperLazy](src/loader/leyyo-enveloper-lazy.ts)           |                 |             |
> Props: `P`: **predictor**, `F`: **FQN**, `E`: **Emit**, `I`: **I18N**

### Dependencies
| Name             | Framework | Description |
|------------------|-----------|-------------|
| `@leyyo/common`  | √         |             |
| `@leyyo/builder` | √         |             |
| `@leyyo/either`  | √         |             |

### Symbols
| Symbol                   | Public | Description    |
|--------------------------|--------|----------------|
| `leyyo:enveloper:config` | -      | trusted config |

## Standards
- Language: `TS`
- Eslint: `Yes`
- Static Code Analysis: `Yes` *IntelliJ Code Inspections*
- DDD - Document Driven: `Yes`
- DDD - Domain Driven: `Yes`
- EDD - Exception Driven: `Yes`
- TDD - Test Driven: `Yes`
- LDD - Log Driven: `Yes`
- 12FA - 12 Factor-App: `50%` *Partially*

## TODO
- `managed ota`
- `managed i18n`
- `managed config`
- `full test cases`

---
### Prepared by
- Mustafa Yelmer
- mustafayelmer(at)gmail.com
- `2025-01-10`
