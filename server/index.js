import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = '<html><body>Hello world</body></html>';
  // ctx.res.setHeader('Access-Control-Allow-Origin', '*');
  return ctx;
});

app.listen(80);