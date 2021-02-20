function axios(config){
  return XMLHttpRequest ? axios.XHRrequest(config) : Noderequest(config);
}

axios.get = function(config){
  return axios({
    method:'get',
    ...config
  });
}

axios.post = function(config){
  return axios({
    method:'post',
    ...config
  });
}

axios.CancelToken = function(handler){
  let resolvePromise = null;
  this.promise = new Promise((resolve)=>{
    resolvePromise = resolve;
  })
  handler(function(message){
    resolvePromise(message);
  });
}

axios.XHRrequest = function(config){
  let xhr = new XMLHttpRequest();
  xhr.open(config.method, config.url, true);//第三个参数代表以后的请求是不是异步的，true为以后都是异步
  if(config.cancelToken){
    config.cancelToken.promise.then((message)=>{
      xhr.abort();
      return Promise.reject(message);
    })
  }
  return new Promise((resolve, reject)=>{
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status < 300){
          resolve({
            data: xhr.response,
            status:xhr.status,
            request:xhr,
            config,
            statusText: xhr.statusText
          });
        }else{
          reject("error!");
        }
      }
    }
    xhr.send();
  })
}

axios.NODErequest = function(){
  return Promise.resolve('send a request via node http module');
}

axios.create = function(baseconfig){
  let befores = [];
  let afters = [];
  let instance = function(config){
    // let promise = Promise.resolve();//befores传进来的参数是config

    let promise = new Promise(resolve => {
      resolve({
        timeout:baseconfig.timeout ? baseconfig.timeout : 0,
        ...config,
        url: baseconfig.baseURL ? baseconfig.baseURL : '' + config.url
      });
    })

    let i = befores.length - 1;

    while(i >= 0){
      let fail = befores[i--];
      let success = befores[i--];
      promise = promise.then(success, fail);  //这里不能是promise.then(success, fail)而没有赋值操作
    }

    promise = promise.then((config)=>{
      return axios(config);
    });
    
    i = 0;

    while(i !== afters.length){
      promise = promise.then(afters[i++], afters[i++]);
    };

    return promise;
  }
  instance.interceptors = {
    request:{
      use(success, fail){
        befores.push(success, fail);
      }
    },
    response:{
      use(success, fail){
        afters.push(success, fail);
      }
    }
  }
  return instance;
}