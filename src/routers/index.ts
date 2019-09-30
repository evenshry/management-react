import Index from 'pages/Index/index';
import Second from 'pages/Second/index';
import Third from 'pages/Second/index';

const routes: Array<HxRoute.RouteItem> = [
  {
    path: '/',
    component: Index,
    exact: true
  },
  {
    path: '/index',
    component: Index,
    routes: [
      {
        path: '/index/third',
        component: Third
      }
    ]
  },
  {
    path: '/second',
    component: Second
  }
];

export default routes;
