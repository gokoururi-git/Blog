let req = [createPromise(300), createPromise(100), createPromise(1000), createPromise(400), createPromise(200), createPromise(800), createPromise(600)];

let minindex = -1;

let waiting = [];

req.forEach((item, index) => {
  item.then(() => {
    if (minindex + 1 === index) {
      minindex++;
      console.log(index);
    } else {
      insert(index);
    }
    while(waiting[0] === minindex + 1){
      console.log(waiting.shift());
      minindex++;
    }
  });
  
})

//工具函数
function createPromise(time){
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

function insert(index){
  let i = waiting.length - 1;
  while(i >= 0 && waiting[i] > index){
    i--;
  };
  waiting.splice(++i, 0, index);
}


