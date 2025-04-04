
### 前端主要技术栈：

- react
- dva
- umi
- webpack
- es6+
- axios
- antd/material-ui

主要模块和实现：

- 文章模块：写文章、看文章、文章管理（编辑和删除等）和文章搜索
- 用户模块：用户注册和登录，个人中心（管理个人事务），个人主页（对外展示）
- 圈子模块：用户聚集的圈子，管理员可对圈子和成员进行管理
- 社交功能：可对文章进行评论，对评论和回复进行回复；对文章进行打赏；可在反馈页面反馈问题，提交建议，所用用户可以进行讨论
- 消息模块：收到新消息（文章评论和回复、反馈讨论等）、需要同意/审批的流程进度更新时（申请加入圈子等），用户可以实时收到消息推送，便于及时处理

## Quick Start

### 开始使用

安装依赖
```
cnpm i
```

本地开发
```
npm start
```

如果没有报错，项目就会运行在 [127.0.0.1:8000](http://127.0.0.1:8000)

## 目录结构

```
.
├── README.md
├── config                      // 配置文件
│   ├── config.js                  - 构建配置
│   ├── menu.config.js             - 菜单配置
│   ├── plugin.config.js           - 插件配置
│   ├── project.config.js          - 项目相关信息配置
│   └── router.config.js           - 路由配置
├── lib                         // 引用的相对独立的库
│   └── iconFont.js                - 自定义的图标字体库（基于阿里的iconfont）
├── package-lock.json
├── package.json
├── src
│   ├── app.ts                  // 前端入口
│   ├── common                  // 通用代码
│   ├── components              // 原则上无状态的组件
│   ├── global.css              // 全局样式
│   ├── layouts                 // 布局模式
│   ├── models                  // 状态管理
│   ├── pages                   // 页面路由组件
│   ├── services                // 负责与API的交互
│   └── utils                   // 通用工具
├── tsconfig.json               // ts配置文件
├── tslint.yml                  // tslint配置文件
└── typings.d.ts                // ts声明文件
```

## 前后端流程

- 1、浏览器访问页面URL
- 2、前端渲染路由组件
- 3、状态管理(models) 、与后台交互，发起请求等（services）
- 4、nginx过滤、转发等
- 5、后台监听收到请求（router）
- 6、根据路由映射调用处理函数（controller）
- 7、与数据库交互（service）、业务处理
- 8、返回结果（controller）
- 9、前端接收后处理(models)
- 10、前端UI更新

## 生产部署

先安装[deploy-tool](https://github.com/weihomechen/deploy-tool)到本地

```
npm i @ifun/deploy -g
```

[deploy-tool说明](https://github.com/weihomechen/deploy-tool/blob/master/README.md)

在项目根目录创建部署配置文件`deploy.config.js`，**为了方便可能会将密码等敏感信息放入此文件，建议将此文件移出git管理**

```js
/**
 * 部署配置，配合@ifun/deploy@2.x
 */
module.exports = {
  dev: {
    web: '88.88.88.88' // 部署到的服务器地址
  },
}
```

```sh
# cd到项目根目录，部署前端项目
deploy app <scheme>

# 示例
deploy app dev
```
