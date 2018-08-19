// @flow

import React, { Component, type Node } from 'react';

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
  homeRoute: ?SiteRoute;

  headerItems: Array<Node>;

  constructor(props: Props) {
    super(props);

    this.homeRoute = getRouteFromKey(props.routes, routeKeys.HOME);
    this.headerItems = props.routes.map(this.getHeaderItem);
  }

  getHeaderItem = (route: SiteRoute) => {
    const { path } = route;

    if (typeof path !== 'string') {
      return null;
    }

    const absolutePath = getAbsolutePath(path);

    return (
      <HeaderListItem key={`header-${route.key}`}>
        <HeaderListLink
          exact={path === absolutePath}
          activeClassName={activeClassName}
          to={absolutePath}
        >
          {route.title}
        </HeaderListLink>
      </HeaderListItem>
    );
  }

  render() {
    return (
      <PaddedHeader className="pure-u-1 pure-u-md-3-4 offset-md-1-4">

        {this.homeRoute ? (
          <h2><TitleLink to={this.homeRoute.path}>{DEFAULT_TITLE}</TitleLink></h2>
        ) : null}

        <nav>
          <HeaderList>
            {this.headerItems}
          </HeaderList>
        </nav>
      </PaddedHeader>
    );
  }
}
