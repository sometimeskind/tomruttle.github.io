// @flow

import React, { Component } from 'react';

import type { SiteRoutes, SiteRoute } from '../../types';

import { getAbsolutePath, getRouteFromKey } from '../../routing-helpers';

import { routeKeys, DEFAULT_TITLE } from '../../constants';

import {
  PaddedHeader,
  TitleLink,
  HeaderList,
  HeaderListItem,
  HeaderListLink,
  activeClassName,
} from './header.styles';

type Props = {
  routes: SiteRoutes,
};

export default class Header extends Component<Props> {
  getRoute = (route: SiteRoute) => {
    const path = route.get('path');

    if (!path) {
      return null;
    }

    const absolutePath = getAbsolutePath(path);

    return (
      <HeaderListItem key={`header-${route.get('key')}`}>
        <HeaderListLink
          exact={path === absolutePath}
          activeClassName={activeClassName}
          to={absolutePath}
        >
          {route.get('title')}
        </HeaderListLink>
      </HeaderListItem>
    );
  }

  render = () => {
    const { routes } = this.props;

    const homeRoute = getRouteFromKey(routes, routeKeys.HOME);

    return (
      <PaddedHeader className="pure-u-1 pure-u-md-3-4 offset-md-1-4">

        {homeRoute ? (
          <h2><TitleLink to={homeRoute.get('path')}>{DEFAULT_TITLE}</TitleLink></h2>
        ) : null}

        <nav>
          <HeaderList>
            {routes.map(this.getRoute)}
          </HeaderList>
        </nav>
      </PaddedHeader>
    );
  }
}
