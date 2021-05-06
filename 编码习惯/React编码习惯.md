<!--
 * @Description: 
 * @Author: caohaohao
 * @Date: 2021-03-29 20:47:27
 * @LastEditTime: 2021-04-30 09:32:56
 * @LastEditors: caohaohao
-->
## state不可变更原则

在对state进行修改时，建议深度拷贝之后setState

> 引申：redux也只能通过reducer改变数据

## 二次取值一定要检查

例如`data[type][index]`一定要检查type会不会出现超出范围的值（因为这个owner重新构建了一次）