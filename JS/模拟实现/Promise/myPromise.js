function myPromise(after){
  this.state = 0;
  this.data = null;
  let resolve = (data)=>{
    this.state = 1;
    this.data = data;
  }
  let reject = (err)=>{
    this.state = 0;
    this.data = err;
  }
  after(resolve, reject);
}
myPromise.prototype.then= function(success, fail){
  if(this.state === 1){
    success(this.data);
  }else{
    fail(this.data);
  }
}
let temp = new myPromise((resolve, reject)=>{
  resolve('执行成功');
}).then((res)=>{
  console.log('---then:');
  console.log(res);
},(err)=>{
  console.log('--err:');
  console.log(err);
}
)
