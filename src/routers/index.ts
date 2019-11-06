import Login from 'pages/common/Login';
import Index from 'pages/common/Index/index';
import System from 'pages/common/System/index';
import { unionPath } from './util';
import indexChildren from './business/index';

/**
 * 公用页面路径
 */
export const commonRoutes: Array<HxRoute.RouteItem> = [
  {
    path: '/login',
    component: Login
  }
];

/**
 * 权限页面路由
 */
export const systemRoutes: Array<HxRoute.RouteItem> = [
  {
    path: '/',
    component: Index,
    routes: [
      {
        path: '/business',
        indexPath: 'home',
        title: '商家系统',
        component: System,
        routes: unionPath('/business', indexChildren),
        isMenu: true
      }
    ]
  }
];
