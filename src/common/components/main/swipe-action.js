// @flow

import type { RouterHistory } from 'react-router';

import { getAbsolutePath } from '../../routing-helpers';

import type { SiteRoutes } from '../../types';

export function getNewPath(routes: SiteRoutes, currentRouteIndex: number, delta: number) {
  const maxRouteIndex = routes.size - 1;

  let newIndex;
  if (delta > 0) {
    newIndex = currentRouteIndex + delta > maxRouteIndex ? maxRouteIndex : currentRouteIndex + delta;
  } else {
    newIndex = currentRouteIndex + delta < 0 ? 0 : currentRouteIndex + delta;
  }

  return getAbsolutePath(routes.get(newIndex).get('path'));
}

export default function swiped(history: RouterHistory, routes: SiteRoutes, currentRouteIndex: number) {
  return (e: any, deltaX: number, deltaY: number, isFlick: bool) => {
    if (isFlick) {
      const horizontal = Math.abs(deltaX) > Math.abs(deltaY);

      if (horizontal) {
        const delta = deltaX > 0 ? 1 : -1;
        const newPath = getNewPath(routes, currentRouteIndex, delta);
        history.push(newPath);
      }
    }
  };
}
