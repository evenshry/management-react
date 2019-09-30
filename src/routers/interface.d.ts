declare namespace HxRoute {
  /**
   * 路由项
   */
  interface RouteItem {
    path: string;
    component: any;
    exact?: boolean;
    routes?: Array<RouteItem>;
  }
}
