class myJSON{
  static stringify(target){
    if(typeof target === 'bigint'){
      throw new TypeError("Do not know how to serialize a BigInt");
    }
    if(typeof target === 'function' || typeof target === 'symbol'){
      return "undefined";
    }
    if(typeof target !== 'object' || target === null){
      return String(target);
    }
    let ret = "{";
    Object.keys(target).forEach((key, index, array) => {
      if(typeof target[key] === 'function' || typeof target[key] === "undefined"){
        return;
      }
      if(typeof target[key] === 'string'){
        ret += `"${key}":"${target[key]}"${index === array.length - 1 ? '' : ','}`;
      }else{
        ret += `"${key}":${myJSON.stringify(target[key])}${index === array.length - 1 ? '' : ','}`;
      }
    });
    return ret + '}';
  }
}

const test = {
  a: {
    b: {
      c: "hello"
    },
    d: {
      e: 123,
      f: true,
      g:()=>{},
      h: undefined,
      i: null
    }
  }
}

console.log(JSON.stringify(test));
console.log(myJSON.stringify(test));
