# loader和plugin入门

[Webpack原理—编写Loader和Plugin](https://www.jianshu.com/p/c021b78c9ef2)

## loader

```ts
export function XXXLoader(source:string):string{
  return source;
}
```

## plugin

```js
export class XXXPlugin{
  constructor(XXXOptions){
    //...
  }
  apply(compiler){
    compiler.plugin('compilation', (compilation)=>{
      //...
    })
  }
}
```