class queue{
  constructor(){
    this.stack = [];
    this.stack_reverse = [];
  }
  push(item){
    if(this.stack.length === 0){
      while(this.stack_reverse.length !== 0){
        this.stack.push(this.stack_reverse.pop());
      }
    }
    this.stack.push(item);
  }
  shift(){
    if(this.stack_reverse.length === 0){
      while(this.stack.length !== 0){
        this.stack_reverse.push(this.stack.pop());
      }
    }
    return this.stack_reverse.pop();
  }
}

let test = new queue();

test.push(1);test.push(2);test.push(3);test.shift();test.push(3);test.push(4);test.push(5);test.push(6);

console.log(test.shift(),test.shift(),test.shift(),test.shift(),test.shift(),test.shift());

let real = [];

real.push(1);real.push(2);real.push(3);real.shift();real.push(3);real.push(4);real.push(5);real.push(6);

console.log(real.shift(),real.shift(),real.shift(),real.shift(),real.shift(),real.shift());

