# vdom以及diff算法的必要性

在常见的MVVM框架中，vdom和diff算法往往都是很重要的概念，所以我们需要理解它的设计思路

## vdom和diff算法的概念

### vdom

  vdom是用JS对象对真实DOM的描述

### diff算法

  在页面改变的过程中，会有不同版本的vdom生成，而这些不同版本的vdom之间往往相差不大，我们需要一个算法，让我们计算出这些不同版本的vdom之间具体有哪些差别，然后根据这些差别，再对真实DOM进行尽可能小范围的改动

## vdom的必要性

  - 首先，由于diff算法需要依赖于vdom，所以diff算法的必要性也是vdom的必要性
  - 其次，也是很重要的一条、我们没必要对每一次vdom变化都实时去操作对应真实dom。我们可以将足够量的变化积攒起来转化为一次变化，再统一更新真实dom就可以减少回流重绘。这便是**异步更新原理**的核心
  - 最后，目前大型MVVM框架都在朝着适应大前端的特性发展，也就是说，也需要支持生成原生安卓、IOS、桌面的应用程序的能力。而我们知道react其实只是UI组件库，它能那么强大是因为强大的社区工具做了支持。而且它也推崇更加开放的社区参与，在此基础上，我们需要有东西来支撑React与社区的交互，那么vdom就可以理解为一种描述界面的协议。如此一来，ReactDOM开发者只需要根据vdom来把它应用于浏览器端，react native也只需要根据vdom来把它用于安卓、IOS。同时这个“协议”的存在也让没有document对象的node在SSR（服务端渲染）上能发挥它的实力。对于vue来说，官方目前并没有就vue的大前端化做出对应的产品，目前也只能依赖vue版本的vdom，让社区出对策。好在阿里的开源项目weex如期而至，没有让vue在大前端化上难堪。

## diff算法的必要性

  听起来似乎diff算法要不要无所谓，因为我们只需要把每次最新版本的vdom转化成真实DOM就好了，而且社区中也经常能听到“实际中一直去修改真实DOM未必会比diff算法慢”的声音，但是diff其实是有它必须存在的理由的：

  - 如果不采用diff算法而是每次直接生成最新版本的DOM的话，因为每次生成的DOM都是最新的，所以会丢失focus状态、已经填好的表单信息、scroll的状态、selection的状态等信息，这是用户不能接受的。