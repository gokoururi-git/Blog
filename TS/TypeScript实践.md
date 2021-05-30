# TypeScript实践

## 泛型

### 对泛型的约束

一般的情况

```ts
function test<T extends {num: number}>(){
  return function(a: T){};
}

test<{num: number, bar: string}>()({
  num: 123,
  bar: "123"
});
```

其中bar也会进行提示

但是

```ts
function test<T extends {num: number}>(){
  return function(a: T){};
}

test<{bar: string}>()({
  bar: "123"
});
```

就会因为缺少num而报错

**总结就是：对泛型的约束表示不可少的部分**


