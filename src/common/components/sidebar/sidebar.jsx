// @flow

import React, { Component } from 'react';

import type { SiteRoutes, CurrentRoute, SiteRoute } from '../../types';

import {
  SideMenu,
  Header,
  List,
  ListLink,
  ListItemSideMenu,
  activeClassName,
} from './sidebar.styles';

type Props = {
  currentRoute: ?CurrentRoute,
  routes: SiteRoutes,
};

export default class Sidebar extends Component<Props> {
  getRoute = (route: SiteRoute) => {
    const { path } = route;

    if (typeof path !== 'string') {
      return null;
    }

    return (
      <ListItemSideMenu key={`sidebar-${route.key}`}>
        <ListLink activeClassName={activeClassName} to={route.path}>{route.title}</ListLink>
      </ListItemSideMenu>
    );
  }

  render() {
    const { currentRoute, routes } = this.props;

    if (currentRoute) {
      const topLevelIndex = currentRoute.parent ? currentRoute.parent.index : currentRoute.index;
      const topLevelRoute = routes[topLevelIndex];

      if (topLevelRoute) {
        const subRoutes = topLevelRoute.routes;

        if (subRoutes) {
          return (
            <SideMenu>
              <Header>
                <hr className="pure-u-1-2" />
                <h4>{topLevelRoute.sidebarHeader}</h4>
              </Header>

              <nav>
                <List>
                  {subRoutes.map(this.getRoute)}
                </List>
              </nav>
            </SideMenu>
          );
        }
      }
    }

    return null;
  }
}
