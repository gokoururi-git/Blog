function throttling(func, layout){
  let timer = null;
  return function(...args){
    if(timer !== null){
      return;
    }
    timer = setTimeout(()=>{
      func.apply(this, args);
      timer = null;
    }, layout);
  }
}