import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import koaCORS from 'koa2-cors';

function timer(time) {
  return new Promise((resolve) => { setTimeout(resolve, time) });
}

const app = new Koa();

const router = new KoaRouter();

router.post('/test', async (ctx) => {
  ctx.body = ctx.request.body.payload;
  await timer(Math.random()*1000 % 1000);
  return ctx;
});

router.post('/test1', async (ctx) => {
  ctx.body = ctx.request.body.payload;
  await timer(Math.random()*1000 % 1000);
  return ctx;
})

app.use(koaCORS());
app.use(koaBody());
app.use(router.routes());


app.listen(8080);