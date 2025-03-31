/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2020-10-05 22:06:34
 * @LastEditors: 小白
 * @LastEditTime: 2022-02-17 00:14:09
 */
import { White } from '@/typings';
import { lazy } from 'react';
const Home = lazy(() => import(/* chunkName: Home */ '@/pages/Home'));
const Index = lazy(() => import(/* chunkName: Index */ '@/pages/Index'));
const Login = lazy(() => import(/* chunkName: Login */ '@/pages/Login'));
const Setting = lazy(() => import(/* chunkName: Setting */ '@/pages/Setting'));
const GameLog = lazy(() => import(/* chunkName: GameLog */ '@/pages/GameLog'));
const DownlineDetail = lazy(
  () => import(/* chunkName: DownlineDetail */ '@/pages/DownlineDetail'),
);
const DownlineLogs = lazy(
  () => import(/* chunkName: DownlineLogs */ '@/pages/DownlineLogs'),
);
const DownlineManagement = lazy(
  () =>
    import(/* chunkName: DownlineManagement */ '@/pages/DownlineManagement'),
);
const GamePage = lazy(
  () => import(/* chunkName: GamePage */ '@/pages/GamePage'),
);
const Password = lazy(
  () => import(/* chunkName: Setting */ '@/pages/Password'),
);
const AddUser = lazy(
  () => import(/* chunkName: AddAgent */ '@/pages/AddUser'),
);
const NoFound = lazy(
  () => import(/* chunkName: NoFound */ '../components/NoFound'),
);
export const TabBarList: White.RouteTabBar[] = [
  {
    path: '/gameLog',
    component: GameLog,
    icon: require('../components/Footer/img/btn-gamelog.png'),
    sceneMode: 'scroll',
    title: 'GameLog',
  },
  {
    path: '/support',
    component: GameLog,
    icon: require('../components/Footer/img/btn-support.png'),
    sceneMode: 'scroll',
    title: 'Support',
  },
  {
    path: '/downlineManagement',
    component: DownlineManagement,
    icon: require('../components/Footer/img/btn-downline.png'),
    sceneMode: 'scroll',
    title: 'Downline',
  },
  {
    path: '/setting',
    component: Setting,
    icon: require('../components/Footer/img/btn-setting.png'),
    sceneMode: 'scroll',
    title: 'Setting',
  },
];

const routes: White.RouteConfig[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/setting',
    component: Setting,
  },
  {
    path: '/password',
    component: Password,
  },
  {
    path: '/gameLog',
    component: GameLog,
  },
  {
    path: '/downlineDetail',
    component: DownlineDetail,
  },
  {
    path: '/downlineLogs',
    component: DownlineLogs,
  },
  {
    path: '/downlineManagement',
    component: DownlineManagement,
  },
  {
    path: '/gamePage',
    component: GamePage,
  },
  {
    path: '/addNewUser',
    component: AddUser,
  },
  {
    path: '*',
    component: NoFound,
  },
];

export default [...routes];
