# bug记录

1. `data[index1][index2]`没判断index1能不能取到值，导致页面崩溃

改进：不仅是这个，即使是props也得时刻注意有没有传来值

2. 使用res.attr === undefined判断了后端有没有配置属性attr，但是后端以空字符串传来代表没配置

改进：使用res.attr ? : 或者if(res.attr)统一进行后端有没有配置的判断

