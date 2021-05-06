由于React没有提供双向绑定，所以我们需要自己进行**组件层面**的双向绑定

> 为什么React不提供双向绑定：
> 1. 最主要的原因：React只关心view层，而且核心思想是单向数据流（单向数据流与redux结合非常有利于大型项目的维护，因为redux就是单向的）
> 2. 没必要，提供双向绑定少写不了多少代码，而且很明显与设计思想相悖

以下是双向绑定的案例

```tsx | pure
import React, {useState} from 'react';

export function InputDemo(props: InputDemoProps){
    let [inputValue, setInputVlaue] = useState('');
    return (<div>
        <div>{inputValue}</div>
        <input
            defaultValue={inputValue}
            onInput={(e :类型略)=>{
                setInputValue(e.target?.value ?? '');
            }}
        />
    </div>);
}
```

类似state、我们也可以用redux

以上的设计思路都被称作受控组件(controlled component)

而非受控组件采用ref直接读取DOM的方式获取input值

除此之外，我们还可以使用第三方库比如`antd`的`rc-form`