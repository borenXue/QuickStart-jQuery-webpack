# jQuery + Webpack2 开发环境 Demo


> 初始化:

```
yarn install
```

> 新建页面:

```
yarn new
```

> 开发模式

```
yarn dev
```

> 打包

```
yarn build
```

> 关键配置项

配置文件为: `build/config.js` 核心配置项如下：

- uglify: js文件是否压缩混淆
- extractCss: css文件是否单独抽取为一个文件
- forceLint: 设置build前是否必须通过Eslint检验
- forceVendor: `[String | Array<String>]` 强制将匹配文件或文件组打包vendor.js中, 一般用于项目中的公共js文件; 优先级: (forceVendor > notVendor)
```
// 示例:
forceVendor: 'src/public/main.js'
forceVendor: ['src/public/main.js']
```

- notVendor: `[String | Array<String>]` 强制将某个匹配文件或文件组不打入vendor.js中, 一般用于npm依赖管理下的js库要在某个页面里面单独使用,而其他页面并不依赖,且该库体积较大时
```
// 优先级
forceVendor > notVendor
// 示例: 
notVendor: 'node_modules/selectize'
notVendor: ['node_modules/selectize']
```


# CHANGELOG

> v1.0.0 (Realse version v1.0.0)

* 支持多页面开发
* 加入 ESLint 校验
* 开发友好: 网页时实显示webpack报错
* 提供多个配置条件: 是否提取css、是否强制ESLint预校验、可灵活配置某些模块或文件是否打入公共js文件`vendor.js`
* 修复 webpack 构建过程中的`代码不变, 生成的带md5的文件名却改变`
