# canvas-log

Log every canvas method call. Add hooks to canvas methods call.

## install

npm

```bash
npm i canvas-log
```

yarn

```bash
yarn add canvas-log
```

## usage

### logs

```javascript
import CanvasLog from 'canvas-log';

// Assume you have a canvas <canvas width="600" height="400" id="c"></canvas> on html.
// Get a canvas context.
const ctx = document.querySelector('#c').getContext('2d');

const logger = new CanvasLog(ctx);

// your draw logic here
ctx.scale(1, 1)
ctx.save()
ctx.strokeStyle = 'red'
ctx.lineWidth  = 5
ctx.translate(100, 100)
ctx.moveTo(0, 0)
ctx.lineTo(0, 60)
ctx.lineTo(90, 60)
ctx.lineTo(90, 0)
ctx.closePath()
ctx.stroke()

// print all records
console.info(logger.getAllRecords())
// [
//   {method: 'scale', args: [1, 1], invokeAt: 1640746288817},
//   {method: 'save', args: [], invokeAt: 1640746288818},
//   {method: 'translate', args: [100, 100], invokeAt: 1640746288818},
//   {method: 'moveTo', args: [0, 0], invokeAt: 1640746288818},
//   {method: 'lineTo', args: [0, 60], invokeAt: 1640746288818},
//   {method: 'lineTo', args: [90, 60], invokeAt: 1640746288818},
//   {method: 'lineTo', args: [90, 0], invokeAt: 1640746288818},
//   {method: 'closePath', args: [], invokeAt: 1640746288818},
//   {method: 'stroke', args: [], invokeAt: 1640746288818},
// ]

// print all formated logs
console.info(logger.getAllLogs())
// [
//   "scale(1, 1)",
//   "save()",
//   "translate(100, 100)",
//   "moveTo(0, 0)",
//   "lineTo(0, 60)",
//   "lineTo(90, 60)",
//   "lineTo(90, 0)",
//   "closePath()",
//   "stroke()",
// ]

// filter record
console.info(logger.filterRecords(item => item.method === 'lineTo'))
// [
//   {method: 'lineTo', args: [0, 60], invokeAt: 1640746288818},
//   {method: 'lineTo', args: [90, 60], invokeAt: 1640746288818},
//   {method: 'lineTo', args: [90, 0], invokeAt: 1640746288818},
// ]
```

### hooks

```javascript
import CanvasLog from 'canvas-log';

const ctx = document.querySelector('#c').getContext('2d');
const logger = new CanvasLog(ctx, {
  hooks: {
    all: {
      before(method, params) {
        console.info(`[all] before ${method} call`, params);
      },
      after(method, params) {
        console.info(`[all] after ${method} call`, params);
      },
    },
    moveTo: {
      before(method, params) {
        console.info(`<moveTo>`, params);
      },
      after(method, params) {
        console.info(`</moveTo>`, params);
      },
    },
    closePath: {
      before(method, params) {
        console.info(`before closePath`, params);
      },
      after(method, params) {
        console.info(`after closePath`, params);
      },
    },
  },
});

// your draw logic here
ctx.moveTo(0, 0)
ctx.lineTo(0, 60)
ctx.lineTo(90, 60)
ctx.closePath()
ctx.stroke()

// [all] before moveTo call [0, 0]
// <moveTo> [0, 0]
// </moveTo> [0, 0]
// [all] after moveTo call [0, 0]
// [all] before lineTo call [0, 60]
// [all] after lineTo call [0, 60]
// [all] before lineTo call [90, 60]
// [all] after lineTo call [90, 60]
// [all] before closePath call []
// before closePath []
// after closePath []
// [all] after closePath call []
// [all] before stroke call []
// [all] after stroke call []
```

## Model

CanvasRecord

|property|type|desc|
|--|--|--|
|method|string|Invoked method name of canvas context|
|args|array|Params passed to method|
|invokeAt|number|Time when method called at, in milliseconds|

## API

### Constructor

CanvasLog(ctx, options: Options)

- ctx: 2dcontext of canvas
- options: other options, can be omitted

Options

|property|type|default value|desc|
|--|--|--|--|
|withParams|boolean|true|whether or not record arguments of method invocation|
|hooks|Hooks|{}|hooks when canvas method call|

Hooks

Hook names equal to canvas context method names.

```typescript
{
  all?: { // special hook apply to all methods
    before?: (method?: string, args?: any[]) => any;
    after?: (method?: string, args?: any[]) => any;
  };
  [methodName1]: {
    before?: (method?: string, args?: any[]) => any;
    after?: (method?: string, args?: any[]) => any;
  };
  [methodName2]: {
    before?: (method?: string, args?: any[]) => any;
    after?: (method?: string, args?: any[]) => any;
  };
}
```

### logger.getAllRecords()

Return all records of canvas method invocation.

### logger.filterRecords(filter)

Return records of canvas method invocation which match the filter.

filter: (record: CanvasRecord) => boolean;

### logger.getAllLogs()

Return all formated string of records
