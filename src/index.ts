import CanvasRecord from './canvas-record';

type Hook = (method?: string, args?: any[]) => any;

type Hooks = {
  [prop: string]: {
    before: Hook;
    after: Hook;
  };
};

type Options = {
  withParams: boolean;
  hooks?: Hooks;
};

const defaultOptions: Options = {
  withParams: true,
};

const noop = () => {};

const toFunction = (fn: any) => (typeof fn === 'function') ? fn : noop;

export default class CanvasLogger {
  records: CanvasRecord[] = [];

  constructor(canvasCtx: any, options: Options = defaultOptions) {
    const canvasProto = Object.getPrototypeOf(canvasCtx);
    const records = this.records;

    const protoFnNames = Object
      .keys(canvasProto)
      .filter((key) => typeof canvasCtx[key] === 'function');

    protoFnNames.forEach((method) => {
      const originFn = canvasCtx[method];

      canvasCtx[method] = function (...args: any) {
        records.push(new CanvasRecord(method, options.withParams ? args : undefined));

        toFunction(options.hooks?.all?.before)(method, args);
        toFunction(options.hooks?.[method]?.before)(method, args);

        const ret = originFn.call(canvasCtx, ...args);

        toFunction(options.hooks?.[method]?.after)(method, args);
        toFunction(options.hooks?.all?.after)(method, args);
        return ret;
      };
    });
  }

  getAllRecords() {
    return this.records;
  }

  getAllLogs(formatter?: (r: any) => string) {
    return this.records.map((record) => {
      return (typeof formatter === 'function') ? formatter(record) : record.toString();
    });
  }

  filterRecords(filter: (item: CanvasRecord) => boolean) {
    return this.records.filter(filter);
  }
}
