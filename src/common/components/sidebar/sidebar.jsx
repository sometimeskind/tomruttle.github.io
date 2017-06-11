// @flow

import React from 'react';

import type { SiteRoutes, CurrentRoute } from '../../types';

import { SideMenu, Header, List, ListLink, ListItemSideMenu, activeClassName } from './sidebar.styles';

export default function Sidebar({ currentRoute, routes }: { currentRoute: CurrentRoute | null, routes: SiteRoutes }) {
  if (currentRoute) {
    const topLevelIndex = currentRoute.parent ? currentRoute.parent.index : currentRoute.index;
    const topLevelRoute = routes.get(topLevelIndex);

    if (topLevelRoute) {
      const subRoutes = topLevelRoute.get('routes');

      if (subRoutes) {
        return (
          <SideMenu>
            <Header>
              <hr className="pure-u-1-2" />
              <h4>{topLevelRoute.get('sidebarHeader')}</h4>
            </Header>

            <nav>
              <List>
                {subRoutes.filter((route) => route.get('path')).map((route) => (
                  <ListItemSideMenu key={`sidebar-${route.get('key')}`}>
                    <ListLink activeClassName={activeClassName} to={route.get('path')}>{route.get('title')}</ListLink>
                  </ListItemSideMenu>
                ))}
              </List>
            </nav>
          </SideMenu>
        );
      }
    }
  }

  return null;
}
