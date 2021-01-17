class MyExpress {
  constructor() {
    this.funcs = [];
    this.start = 0;
    this.req = null;
    this.res = null;
  }
  use(fun) {
    this.funcs.push(fun);
  }
  next() {
    let fun = this.funcs[this.start++];
    if (fun === undefined) {
      return;
    }
    fun(this.req, this.res, this.next.bind(this));//需要注意到use里面传的函数的next的调用的地方是这里，是由window调用的，我们需要手动bind
  }
  run(initReq, initRes) {
    this.req = initReq;
    this.res = initRes;
    this.next();
  }
}
var app = new MyExpress();

app.use(function (req, res, next) {
  console.log(1);
  next();
  console.log(2)
});
app.use(function (req, res, next) {
  console.log(3);
  next();
  console.log(4);
});
app.use(function (req, res) {
  console.log(5);
  console.log('end');
  console.log(6);
});
app.run();