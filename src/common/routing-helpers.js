// @flow

import pathToRegexp from 'path-to-regexp';
import { matchPath } from 'react-router';

import type { SiteRoutes, SiteRoute, RouteObj, CurrentRoute } from './types';

export function getAllPaths(routes: SiteRoutes) {
  return routes.reduce((paths, route) => {
    const subRoutes: SiteRoutes = route.get('routes');

    let newPaths: Array<string> = [];
    if (subRoutes) {
      newPaths = getAllPaths(subRoutes);
    } else {
      const path: string = route.get('path');

      if (path) {
        newPaths = [path];
      }
    }

    return paths.concat(newPaths);
  }, []);
}

export function getCurrentRoute(routes: SiteRoutes, pathname: string): CurrentRoute | null {
  function findCurrentRoute(searchRoutes: Array<RouteObj>, parent?: CurrentRoute) {
    return searchRoutes.reduce((key, route, index) => {
      if (route.path) {
        const matched = matchPath(pathname, route.path);

        if (matched && matched.isExact) {
          if (route.routes) {
            const subRouteKey = findCurrentRoute(route.routes, { key: route.key, index, parent });

            if (subRouteKey) {
              return subRouteKey;
            }
          }

          return { key: route.key, index, parent };
        }
      }

      return key;
    }, null);
  }

  return findCurrentRoute(routes.toJS());
}

export function getAbsolutePath(pathname: string = ''): string {
  const absolutePath: string = pathToRegexp.parse(pathname)[0];
  return `${absolutePath}${absolutePath && absolutePath.endsWith('/') ? '' : '/'}`;
}

export function findRoute(routes: SiteRoutes, routeKey: string): SiteRoute {
  return routes.filter((route) => route.get('key') === routeKey).get(0);
}

export function getNextPath(routes: SiteRoutes, currentRouteIndex: number, delta: number) {
  const navigableRoutes: SiteRoutes = routes.filter((route) => route.get('title'));

  let newIndex;
  if (delta > 0) {
    const maxRouteIndex = navigableRoutes.size - 1;
    newIndex = currentRouteIndex + delta > maxRouteIndex ? maxRouteIndex : currentRouteIndex + delta;
  } else {
    newIndex = currentRouteIndex + delta < 0 ? 0 : currentRouteIndex + delta;
  }

  const currentPath: string = navigableRoutes.get(newIndex).get('path');
  return getAbsolutePath(currentPath);
}

export function getNewPathFromSwipe(routes: SiteRoutes, currentRoute: CurrentRoute, deltaX: number, deltaY: number) {
  const horizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (horizontal) {
    const delta = deltaX > 0 ? 1 : -1;
    const currentRouteIndex = currentRoute.parent ? currentRoute.parent.index : currentRoute.index;
    return getNextPath(routes, currentRouteIndex, delta);
  }

  const delta = deltaY > 0 ? 1 : -1;

  if (currentRoute.parent) {
    const currentRoutes: SiteRoutes = routes.get(currentRoute.parent.index).get('routes');
    return getNextPath(currentRoutes, currentRoute.index, delta);
  }

  if (delta > 0) {
    const subRoutes: SiteRoutes = routes.get(currentRoute.index).get('routes');

    if (subRoutes) {
      return getNextPath(subRoutes, -1, delta);
    }
  }

  return '';
}
