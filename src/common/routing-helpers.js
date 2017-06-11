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

export function getRouteFromPath(routes: SiteRoutes, pathname: string): CurrentRoute | null {
  function findRoute(searchRoutes: Array<RouteObj>, parent?: CurrentRoute) {
    return searchRoutes.reduce((key, route, index) => {
      if (route.path) {
        const matched = matchPath(pathname, route.path);

        if (matched && matched.isExact) {
          if (route.routes) {
            const subRouteKey = findRoute(route.routes, { key: route.key, index, parent });

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

  return findRoute(routes.toJS());
}

export function getAbsolutePath(pathname: string = ''): string {
  const absolutePath: string = pathToRegexp.parse(pathname)[0];
  return `${absolutePath}${absolutePath && absolutePath.endsWith('/') ? '' : '/'}`;
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
