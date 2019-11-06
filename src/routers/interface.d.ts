declare namespace HxRoute {
  /**
   * 路由项
   */
  interface RouteItem {
    /**
     * 路径
     */
    path: string;
    /**
     * 页面组件
     */
    component?: any;
    /**
     * 显示标题
     */
    title?: string;
    /**
     * 首页路径
     */
    indexPath?: string;
    /**
     * 严格匹配
     */
    exact?: boolean;
    /**
     * 严格匹配 （以 / 结尾）
     */
    strict?: boolean;
    /**
     * 子级路径
     */
    routes?: Array<RouteItem>;
    /**
     * 是否是菜单
     */
    isMenu?: boolean;
  }
}
