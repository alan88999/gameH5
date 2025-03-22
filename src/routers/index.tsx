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
const Search = lazy(() => import(/* chunkName: "Search" */ '@/pages/Search'));
const List = lazy(() => import(/* chunkName: List */ '@/pages/List'));
const Home = lazy(() => import(/* chunkName: Home */ '@/pages/Home'));
const Detail = lazy(() => import(/* chunkName: Detail */ '@/pages/Detail'));
const Index = lazy(() => import(/* chunkName: Index */ '@/pages/Index'));
const Other = lazy(() => import(/* chunkName: Other */ '@/pages/Other'));
const Other1 = lazy(() => import(/* chunkName: Other1 */ '@/pages/Other1'));
const Login = lazy(() => import(/* chunkName: Other1 */ '@/pages/Login'));
const Setting = lazy(() => import(/* chunkName: Setting */ '@/pages/Setting'));
const DownlineDetail = lazy(() => import(/* chunkName: DownlineDetail */ '@/pages/DownlineDetail'));
const DownlineLogs = lazy(() => import(/* chunkName: DownlineLogs */ '@/pages/DownlineLogs'));
const DownlineManagement = lazy(() => import(/* chunkName: DownlineManagement */ '@/pages/DownlineManagement'));
const GamePage = lazy(() => import(/* chunkName: GamePage */ '@/pages/GamePage'));
const Password = lazy(
  () => import(/* chunkName: Setting */ '@/pages/Password'),
);
const NoFound = lazy(
  () => import(/* chunkName: NoFound */ '../components/NoFound'),
);
export const TabBarList: White.RouteTabBar[] = [
  {
    path: '/',
    component: Home,
    icon: 'white-home1',
    sceneMode: 'scroll',
    title: 'GameLog',
  },
  {
    path: '/support',
    component: Detail,
    icon: 'white-tradingdata',
    sceneMode: 'scroll',
    title: 'Support',
  },
  {
    path: '/list',
    component: List,
    icon: 'white-order',
    sceneMode: 'scroll',
    title: 'Downline',
  },
  {
    path: '/setting',
    component: Setting,
    icon: 'white-account',
    sceneMode: 'scroll',
    title: 'Setting',
  },
];

const routes: White.RouteConfig[] = [
  {
    path: '/',
    component: Index,
    tabBars: TabBarList,
  },
  {
    path: '/other',
    component: Other,
  },
  {
    path: '/other1',
    sceneMode: 'bottom',
    component: Other1,
  },
  {
    path: '/dcotorDetail',
    component: Detail,
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
    path: '*',
    component: NoFound,
  },
];

export default [...routes];
