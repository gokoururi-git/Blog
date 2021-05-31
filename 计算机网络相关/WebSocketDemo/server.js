const Koa = require('koa');
const WebSocket = require('ws');

const app = new Koa();
const ws = new WebSocket.Server({port: 8888});

ws.on('connection', ws => {
  console.log('server prepared');

  ws.on('message', msg => {
    console.log(`web socket received message ${msg}`);
  })

  let i = 0;

  setInterval(()=>{
    ws.send(i++);
  }, 1000);
});

app.listen(3000);