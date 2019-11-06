import { unionPath } from '../util';
import Home from 'pages/business/Home';

const routes: Array<HxRoute.RouteItem> = [
  {
    path: '/home',
    title: '首页',
    component: Home,
    isMenu: true
  }
];

export default routes;
