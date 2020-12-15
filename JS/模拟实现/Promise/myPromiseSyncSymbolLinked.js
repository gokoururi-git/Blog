function myPromise(constructor){
  let that = this;
  that.statu = that.states.PENDING;
  that.data = null;
  that.err = null;
  that.onFulfilled = [];
  that.onRejected = [];
  this.resolve = (data)=>{
    if(that.statu === that.states.PENDING){
      that.statu = that.states.FULFILLED;
      that.data = data;
      that.onFulfilled.forEach(fun=>{fun(this.data)});
    }
  }
  this.reject = (err)=>{
    if(that.statu === that.states.PENDING){
      that.statu = that.states.REJECTED;
      that.err = err;
      that.onRejected.forEach(fun=>{fun(this.err)});
    }
  }
  constructor(this.resolve, this.reject);
}

myPromise.prototype.states = {
  PENDING : Symbol("pending"),
  REJECTED : Symbol("rejected"),
  FULFILLED : Symbol("fulfilled")
}

myPromise.prototype.then = function(success, fail){
  if(this.statu === this.states.PENDING){
    this.onFulfilled.push(success);
    this.onRejected.push(fail);
  }else if(this.statu === this.states.FULFILLED){
    this.onFulfilled(this.data);
  }else{
    this.onRejected(this.data);
  }
  return this;
}

new myPromise((resolve, reject)=>{
  setTimeout(()=>{
    reject("err");
  })
}).then((data)=>{
  console.log("success: "+data);
},(err)=>{
  console.log("failed: "+ err);
}).then((res)=>{
  console.log(res);
},(err)=>{
  console.log(err);
})