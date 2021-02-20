1. 首先明确，promise的异常不能能在外边捕获

  ```js
  try{
    new Promise((reslove, reject)=>{
      throw new Error('err');
    })
  }catch(e){
    console.log(e);
  }
  ```

2.