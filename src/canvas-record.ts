export default class CanvasRecord {
  method: string;
  args: any[];
  invokeAt: number;

  constructor(method: string, args: any) {
    this.method = method;
    this.args = args;
    this.invokeAt = Date.now();
  }

  toString() {
    const argsText = (this.args || []).map((arg: any) => {
      if (Array.isArray(arg)) return `[${arg.toString()}]`;
      if (typeof arg === 'string') return `'${arg}'`;
      return arg;
    }).join(', ');

    return `${this.method}(${argsText})`;
  }
}
