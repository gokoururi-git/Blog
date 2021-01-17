class Scheduler{
  constructor(limit){
    this.limit = limit;
    this.count = 0;
    this.runningTasks = [];
    this.waitingTasks = [];
  }
  _run(item){
    this.runningTasks.push(item);
    this.count++;
    item().then(()=>{//开始执行promise并给这个promise增加一个结束的处理逻辑
      item.onEnd();
      this.runningTasks.splice(this.runningTasks.indexOf(item), 1);
      this.count--;
      if(this.waitingTasks.length !== 0){
        this._run(this.waitingTasks.shift());//这里不进行count++，因为交给第10行处理了
      }
    })
  }
  add(item){
    return new Promise((resolve, rejext)=>{
      item.onEnd = resolve;//console事件的“触发”被绑定到这里
      if(this.count >= this.limit){
        this.waitingTasks.push(item);
        this.count++;
      }else{
        this._run(item);
      }
    });
  }
}

const timeout = (time) => new Promise(resolve => {//返回一个时间time后resolve的pormise
	setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)

const addTask = (time, order) => {//以函数形式保存promise，做到需要时再触发（不像我们 new Promise是不能他让延迟触发的）
	scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(400, 4) 
addTask(200, 2) 
addTask(300, 3) 
addTask(100, 1)