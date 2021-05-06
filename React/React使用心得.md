# React使用心得

1. setState不完全是异步函数

    由 React 控制的事件处理过程 setState 不会同步更新。this.state！React 控制之外的情况，setState 会同步更新 this.state。

    具体什么是React控制范围外的：setTimeout、setInterval、绕过React通过addEventListener添加的事件处理函数等...

    [参考](https://www.zhihu.com/question/66749082/answer/246217812)

2. 两个state要一个state改变之后（UI渲染结束之后）在更新另一个state的两种方法

    1. `setOne();setTimeout(()=>{setTwo();});`
    2. `useEffect(()=>{setTwo()}, [one]);`