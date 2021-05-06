# redux的基本使用

## reducer

reducer负责改变state的具体逻辑，在store初始化的时候使用（一个store使用一个固定的reducer），基本形式如下：

```js
function reducer(state, action){
    switch(action.type){
        case 'action1':
            return state + ' has changed by action1';
        case 'action2':
            return state + ' has changed by action2';
        default:
            return state + ' has not changed';
    }
}
```

需要注意的是：reducer函数必须具有**幂等性**（即相同的输入必须是相同的输出），为了实现这个幂等性，我们必须不对state进行直接的操作，而是借用state的值返回一个新的对象

```js
function reducer(state, action){
    return Object.assgin({}, state, {...changedState});//注意这样做还不够严谨，因为assgin方法是一层深拷贝
}
```

## store

store的生成：

```js
import { createStore } from 'redux';
const store = createStore(reducer);
``` 

## state

```js
const state = store.getState();//非响应式
```

## dispatch action

```js
function actionCreator(){//action的生成函数
    return {
        type: 'action_name',
        payload: '负载信息'
    }
}

store.dispatch(actionCreator());//分发action改变state
```

## subscribe

store.subcribe(fun);state改变的时候执行fun函数。

## redux响应式实例

```js
import {createStore} from 'redux';
import React, {useState} from 'react';

function reducer(state /*一般这里不设置默认值，是由createStore的第二个参数决定*/, action){
  switch(action.type){
    case 'add':
      return state + action.payload;
    default:
      //这个default其实至关重要
      //因为我们的reducer会在createStore函数执行的过程中reducer被先行执行一次
      //无论是我们用的是现有两种初始化state的哪种初始化方式
      //甚至不用，我们都得先走一下这个default
      //那个时候的type是类似于"@@redux/INITf.y.3.a.3.g"的字符串
      //而且这个时候action只有一个type字段。
      return state;
  }
}

const store = createStore(reducer, 0);//第二个参数是初始state的值

store.subscribe(()=>{//每次dispatch都会执行这个函数
  console.log(`state changed to ${store.getState()}`);
});

function App() {
  //store.getState()只是获取当前store的快照，没有响应式系统，这里用useState弥补响应式系统。
  const [count, setCount] = useState(store.getState());
  function clickHandler(){
    store.dispatch({
      type: 'add',
      payload: 1
    });
    setCount(store.getState());
  }
  return (
    <div className="App">
      <div>current: {count}</div>
      <button onClick={clickHandler}>add</button>
    </div>
  );
}

export default App;
```


