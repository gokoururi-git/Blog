class LRU{
  /**
   * @param {number} max 缓冲器的最大容量
   */
  constructor(max){
    this.store = new Map();
    this.max = max;
    this.length = 0;
  }
  get(key){
    const temp = this.store.get(key);
    if(!temp){
      return undefined;
    }
    this.store.delete(key);
    this.store.set(key, temp);
    return temp;
  }
  put(key, value){
    if(this.length === this.max){
      this.store.delete(this.store.keys().next().value);
      this.length--;
    }
    this.store.set(key, value);
    this.length++;
  }
}


const test = new LRU(2);

console.log('put 1-->');console.log(test.put(1, 1));
console.log('put 2-->');console.log(test.put(2, 2));
console.log('get 1-->');console.log(test.get(1));       // 返回  1
console.log('put 3-->');console.log(test.put(3, 3));    // 该操作会使得密钥 2 作废
console.log('get 2-->');console.log(test.get(2));       // 返回 -1 (未找到)
console.log('put 4-->');console.log(test.put(4, 4));    // 该操作会使得密钥 1 作废
console.log('get 1-->');console.log(test.get(1));       // 返回 -1 (未找到)
console.log('get 3-->');console.log(test.get(3));       // 返回  3
console.log('get 4-->');console.log(test.get(4));       // 返回  4
