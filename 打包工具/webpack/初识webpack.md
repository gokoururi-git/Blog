# 初识webpack

## webpack优化

1. speed-measure-webpack-plugin对各个module检测打包时间

2. `happypack`插件，开启多进程编译

3. 各loader设置cache，没提供cache的loader可以用cache-loader

4. ParallelUglifyPlugin：在代码压缩阶段开启多进程压缩

## tree shaking

通过ESModule的能力，webpack有办法实现死代码检查，并且在打包时去除掉这些死代码，这个过程就交tree shaking

## code splitting

当我们打包出来的bundle太大时，我们希望能把他们进行拆分，webpack提供了拆分能力，具体有：

webpack自动分割：

```js
//注意这是webpack4版本
module.exports = {
  //...
  optimization:{
    splitChunks:{
      chunks: 'all'
    }
  }
}
```

自定义配置

```js
//webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {//分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1 //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100, //大小超过100个字节
          minChunks: 3 //最少引入了3次
        }
      }
    }
  }
}
```

其中vendor是所有node_modules的文件的chunk