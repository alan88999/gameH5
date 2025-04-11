
# React-ts-h5-template

## 说明

**该项目是由 Vite 构建,基于 React Hooks 框架配合 Typescript 语言的 H5 端快速开发的模板项目,该项目适配屏幕使用的`postcss-px-to-viewport`直接写 px 自动转换为 vw 或者 rem,项目也添加了路由切换动画,适配`chrome safari底部工具栏`**

**项目持续迭代中,如果有疑问[提出 issues](https://github.com/q1104133609/react-ts-h5-template/issues/new)**

## Project setup

```
yarn install or pnpm install
```

### Compiles and hot-reloads for development

```
yarn dev  or pnpm dev
```

### Compiles and minifies for production

```
yarn build:prod or pnpm build:prod
```

### Lints and fixes files

```
yarn lint or pnpm lint
```

## 项目目录

```
react-ts-h5-template
├─ .env.dev //dev⚙
├─ .env.pre //pre⚙
├─ .env.prod //prod⚙
├─ config-overrides.js //webpack⚙
├─ paths.json //alias⚙
├─ public
│  ├─ favicon.ico
│  ├─ index.html //index文件
│  ├─ manifest.json
│  └─ robots.txt
├─ src
│  ├─ App.css
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ api //请求📃
│  │  └─ route.ts
│  ├─ assets  //资源📃
│  │  ├─ css
│  │  │  ├─ common.scss
│  │  │  └─ variables.scss
│  │  ├─ fonts
│  │  │  └─ iconfont.json
│  │  └─ images
│  │     ├─ common
│  │     │  └─ 404.png
│  │     └─ search_tab.png
│  ├─ components //组件📃
│  │  ├─ AnimatedSwitch //动画切换组件
│  │  ├─ LazyImage //懒加载图片组件
│  │  ├─ LoadingView //加载组件
│  │  ├─ NoFound //404组件
│  │  └─ VirList // 虚拟列表组件(完善中)
│  ├─ constant.ts //常量⚙
│  ├─ helpers //帮组📃
│  │  ├─ dispatcher.tsx
│  │  └─ executor.tsx
│  ├─ hooks //自定义hooks📃
│  │  ├─ useAxios.tsx //网络请求hook
│  │  ├─ useDebounce.tsx //防抖hook
│  │  ├─ useModel.tsx //模块状态机hook
│  │  ├─ useThrottle.tsx //节流hook
│  │  └─ useTitle.tsx //标题hook
│  ├─ index.tsx // 入口
│  ├─ layout //布局📃
│  │  ├─ TabBarView //底部栏
│  │  └─ Toast //toast
│  ├─ logo.svg //icon
│  ├─ model //model📃
│  ├─ pages //页面
│  ├─ plugins//插件📃
│  │  └─ request.ts
│  ├─ routers //路由📃
│  ├─ typings //类型📃
│  └─ utils //工具类📃
│     └─ index.ts
└─ tsconfig.json

```

## 图标地址

```
https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2119875
```
