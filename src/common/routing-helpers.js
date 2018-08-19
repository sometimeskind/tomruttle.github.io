// @flow

import pathToRegexp from 'path-to-regexp';
import { matchPath } from 'react-router';

import type {
  SiteRoutes,
  SiteRoute,
  RouteObj,
  CurrentRoute,
} from './types';

export function getAbsolutePath(pathname: string = ''): string {
  const absolutePath: string = pathToRegexp.parse(pathname)[0];
  return `${absolutePath}${absolutePath && absolutePath.endsWith('/') ? '' : '/'}`;
}

export function getAllPaths(routes: SiteRoutes) {
  return routes.reduce((paths, route) => {
    const newPaths: Array<string> = [];

    const path: ?string = route.get('path');
    if (typeof path === 'string') {
      newPaths.push(getAbsolutePath(path));
    }

    const subRoutes: SiteRoutes = route.get('routes');
    if (subRoutes) {
      newPaths.push(...getAllPaths(subRoutes));
    }

    return paths.concat(newPaths);
  }, []);
}

export function getRouteFromPath(routes: SiteRoutes, pathname: string): CurrentRoute | null {
  function findRoute(searchRoutes: Array<RouteObj>, parent?: CurrentRoute) {
    return searchRoutes.reduce((key, route, index) => {
      if (typeof route.path === 'string') {
        const matched = matchPath(pathname, route.path);

        if (matched && matched.isExact) {
          if (route.routes) {
            const subRouteKey = findRoute(route.routes, {
              key: route.key, index, parent, pathname: getAbsolutePath(route.path),
            });

            if (subRouteKey) {
              return subRouteKey;
            }
          }

          return {
            key: route.key, index, parent, pathname,
          };
        }
      }

      return key;
    }, null);
  }

  return findRoute(routes.toJS());
}

export function getRouteFromKey(routes: SiteRoutes, routeKey: string): SiteRoute | null {
  function findRoute(searchRoutes) {
    return searchRoutes.reduce((found, route) => {
      if (route.get('key') === routeKey) {
        return route;
      }

      const subRoutes = route.get('routes');
      if (subRoutes) {
        const foundSubRoute = findRoute(subRoutes);

        if (foundSubRoute) {
          return foundSubRoute;
        }
      }

      return found;
    }, null);
  }

  return findRoute(routes);
}

function getNextPath(routes: SiteRoutes, currentRouteIndex: number, delta: number) {
  const navigableRoutes: SiteRoutes = routes.filter((route) => route.get('path'));

  let newIndex;
  if (delta > 0) {
    const maxRouteIndex = navigableRoutes.size - 1;
    newIndex = currentRouteIndex + delta > maxRouteIndex ? maxRouteIndex : currentRouteIndex + delta;
  } else {
    newIndex = currentRouteIndex + delta < 0 ? 0 : currentRouteIndex + delta;
  }

  if (newIndex === currentRouteIndex) {
    return null;
  }

  const nextPath: string = navigableRoutes.get(newIndex).get('path');
  return getAbsolutePath(nextPath);
}

export function getNewPathFromSwipe(routes: SiteRoutes, currentRoute: CurrentRoute, deltaX: number, deltaY: number) {
  const currentPath = currentRoute.pathname;
  const horizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (horizontal) {
    const delta = deltaX > 0 ? 1 : -1;
    const currentRouteIndex = currentRoute.parent ? currentRoute.parent.index : currentRoute.index;
    return getNextPath(routes, currentRouteIndex, delta) || currentPath;
  }

  return null;
}
