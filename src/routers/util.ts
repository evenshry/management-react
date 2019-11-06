/**
 * 拼接路径
 */
export function unionPath(path, routes: Array<HxRoute.RouteItem>) {
  return routes.map((router) => recursionItem(path, router));
}

/**
 * 递归子级
 */
function recursionItem(path, item: HxRoute.RouteItem) {
  if (item.routes) {
    item.path = `${path}${item.path}`;
    item.routes = item.routes.map((router) => recursionItem(path, router));
  } else {
    item.path = `${path}${item.path}`;
  }
  return item;
}

/**
 * 提炼面包屑
 */
export function getBreadcrumb(routes: Array<HxRoute.RouteItem>): string[] {
  const hash = window.location.hash;
  return recursionHash(hash, routes);
}

/**
 * 递归子级
 */
function recursionHash(hash, routes: Array<HxRoute.RouteItem>): string[] {
  let result: string[] = [];
  routes.some((item) => {
    if (hash.indexOf(item.path) > -1) {
      result.push(item.title || '');
      if (item.routes) {
        result = result.concat(recursionHash(hash, item.routes));
      }
    }
    return hash.includes(item.path);
  });
  return result;
}

/**
 * 获取当前路径
 */
export function getCurrentPath(level?: number): string {
  const hash = window.location.hash;
  const result: string[] = hash.split('/');
  result.shift();
  if (level) {
    result.length = level;
  }
  return '/' + result.join('/');
}
