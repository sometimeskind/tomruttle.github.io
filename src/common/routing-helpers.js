// @flow

import pathToRegexp from 'path-to-regexp';
import { matchPath } from 'react-router';

import type { SiteRoutes, SiteRoute } from './types';

export function getCurrentRouteIndex(routes: SiteRoutes, pathname: string) {
  return routes.findIndex((route) => {
    const routeObj = route.toJS();
    const matched = matchPath(pathname, routeObj);
    return routeObj.path && matched && matched.isExact;
  });
}

export function getAbsolutePath(pathname: string = ''): string {
  const absolutePath = pathToRegexp.parse(pathname)[0];
  return `${absolutePath}${absolutePath && absolutePath.endsWith('/') ? '' : '/'}`;
}

export function findRoute(routes: SiteRoutes, routeKey: string): SiteRoute {
  return routes.filter((route) => route.get('key') === routeKey).get(0);
}
