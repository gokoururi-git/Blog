function myPro(constructor){
  let that = this;
  that.statu = that.states.PENDING;
  that.data = null;
  that.onFulfilled = null;
  that.onRejected = null;
  let resolve = (data)=>{
    if(that.statu === that.states.PENDING){
      that.statu = that.states.FULFILLED;
      that.data = data;
      that.onFulfilled(data);
    }
  }
  let reject = (err)=>{
    if(that.statu === that.states.PENDING){
      that.statu = that.states.REJECTED;
      that.data = err;
      that.onRejected(err);
    }
  }
  constructor(resolve, reject);
}

myPro.prototype.states = {
  PENDING : Symbol("pending"),
  REJECTED : Symbol("rejected"),
  FULFILLED : Symbol("fulfilled")
}

myPro.prototype.then = function(success, fail){
  if(this.statu === this.states.PENDING){
    this.onFulfilled = success;
    this.onRejected = fail;
  }else if(this.statu === this.states.FULFILLED){
    this.onFulfilled(this.data);
  }else{
    this.onRejected(this.data);
  }
}

new myPro((resolve, reject)=>{
  setTimeout(()=>{
    reject("err");
  })
}).then((data)=>{
  console.log("success: "+data);
},(err)=>{
  console.log("failed: "+ err);
});