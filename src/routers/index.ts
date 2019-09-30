import Index from 'pages/Index/index';
import Second from 'pages/Second/index';
import Third from 'pages/Index/index';

const routes: Array<HxRoute.RouteItem> = [
  {
    path: '/',
    component: Index,
    exact: true
  },
  {
    path: '/second',
    component: Second,
    routes: [
      {
        path: '/second/third',
        component: Third
      }
    ]
  }
];

export default routes;
