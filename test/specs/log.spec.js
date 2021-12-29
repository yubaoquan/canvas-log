const { createCanvas } = require('canvas');
const CanvasLog = require('@/index').default;

const prepare = (options) => {
  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext('2d');
  const logger = new CanvasLog(ctx, options);

  return { ctx, logger }
}

describe('logs api', () => {
  it('getAllRecords', () => {
    const { ctx, logger } = prepare();

    ctx.moveTo(0, 0);
    ctx.moveTo(1, 1);
    expect(logger.getAllRecords().length).toEqual(2)
  });

  it('getAllLogs', () => {
    const { ctx, logger } = prepare();

    ctx.moveTo(0, 0);
    ctx.moveTo(1, 1);
    ctx.moveTo(3, 3);
    expect(logger.getAllLogs().length).toEqual(3)
  });

  it('filterRecords', () => {
    const { ctx, logger } = prepare();

    ctx.moveTo(0, 0)
    ctx.lineTo(0, 60)
    ctx.lineTo(90, 60)
    ctx.closePath()
    ctx.stroke()

    expect(logger.filterRecords(record => record.method === 'lineTo').length).toEqual(2)
  });

  it('custom formatter', () => {
    const { ctx, logger } = prepare();

    ctx.moveTo(0, 0)
    ctx.lineTo(0, 60)
    ctx.lineTo(90, 60)
    ctx.closePath()
    ctx.stroke()

    const logs = logger.getAllLogs(record => `ctx.${record.method}(xxx)`)
    console.info(logs)
    expect(logs[0]).toEqual('ctx.moveTo(xxx)')
    expect(logs[1]).toEqual('ctx.lineTo(xxx)')
  });

  it('log without params', () => {
    const { ctx, logger } = prepare({ withParams: false });

    ctx.moveTo(0, 0)
    ctx.lineTo(0, 60)
    ctx.lineTo(90, 60)
    ctx.closePath()
    ctx.stroke()

    const records = logger.getAllRecords();
    expect(records.every(record => record.args === undefined)).toBeTruthy();
    expect(logger.getAllLogs()[0]).toEqual('moveTo()')
  });
});
