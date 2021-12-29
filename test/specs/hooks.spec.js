const { createCanvas } = require('canvas');
const CanvasLog = require('@/index').default;

const prepare = (options) => {
  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext('2d');
  const logger = new CanvasLog(ctx, options);

  return { ctx, logger }
}

describe('test hooks', () => {
  it('all before after', () => {
    const before = jest.fn();
    const after = jest.fn();

    const { ctx, logger } = prepare({
      hooks: {
        all: {
          before,
          after,
        },
      },
    });

    ctx.moveTo(0, 0);
    ctx.moveTo(1, 1);

    expect(before.mock.calls.length).toEqual(2)
    expect(after.mock.calls.length).toEqual(2)
  });

  it('all only before', () => {
    const before = jest.fn();
    const after = jest.fn();

    const { ctx, logger } = prepare({ hooks: { all: { before }}});

    ctx.moveTo(0, 0);
    ctx.moveTo(1, 1);
    ctx.moveTo(2, 2);

    expect(before.mock.calls.length).toEqual(3)
    expect(after.mock.calls.length).toEqual(0)
  });

  it('all only after', () => {
    const before = jest.fn();
    const after = jest.fn();

    const { ctx, logger } = prepare({ hooks: { all: { after }}});

    ctx.moveTo(0, 0);
    ctx.moveTo(1, 1);
    ctx.moveTo(2, 2);

    expect(before.mock.calls.length).toEqual(0)
    expect(after.mock.calls.length).toEqual(3)
  });

  it('moveTo', () => {
    const before = jest.fn();
    const after = jest.fn();

    const { ctx, logger } = prepare({
      hooks: {
        moveTo: {
          before,
          after,
        },
      },
    });

    ctx.moveTo(1, 2);
    ctx.lineTo(2, 3);
    ctx.lineTo(3, 4);

    expect(before.mock.calls[0][0]).toEqual('moveTo');
    expect(before.mock.calls[0][1][1]).toEqual(2);
  });
});
