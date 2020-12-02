function myPromiseSync(constructor){
  let _that = this;
  _that._data = null;
  _that._statu = _that.PENDING;
  _that._onFulfilled = null;
  _that._onRejected = null;
  let resolve = (data) => {
    if(_that._statu = _that.PENDING){
      setTimeout(()=>{
        _that._statu = _that.FULFILLED;
        _that._data = data;
        _that._onFulfilled(data);
      })
    }
  }
  let reject = (err) => {
    if(_that._statu = _that.PENDING){
      setTimeout(()=>{
        _that._statu = _that.REJECTED;
        _that._data = err;
        _that._onRejected(err);
      })
    }
  }
  constructor(resolve, reject);
}

myPromiseSync.prototype.FULFILLED = 1;
myPromiseSync.prototype.REJECTED = 0;
myPromiseSync.prototype.PENDING = 2;

myPromiseSync.prototype.then = function(success, fail){
  if(this._statu === this.FULFILLED){
    this._onFulfilled(this.data);
  }else if(this._statu === this.REJECTED){
    this._onRejected(this.data);
  }else{
    this._onFulfilled = success;
    this._onRejected = fail;
  }
}

new myPromiseSync((resolve, reject)=>{
  setTimeout(()=>{
    resolve('success');
  },500)
}).then((data)=>{
  console.log('success: ' + data);
}, (err)=>{
  console.log('err: ' + err);
})