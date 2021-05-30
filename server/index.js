const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'hello world';
  ctx.res.setHeader('Access-Control-Allow-Origin', '*');
  return ctx;
});

app.listen(3000);