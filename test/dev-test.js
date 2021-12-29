import CanvasLog from '../src/index';

const ctx = document.querySelector('#c').getContext('2d')
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

ctx.moveTo(0, 0)
ctx.lineTo(0, 60)
ctx.lineTo(90, 60)
ctx.closePath()
ctx.stroke()
