// @flow

import type { Location } from 'react-router';

import React, { Component, type Node } from 'react';
import { Route, Switch } from 'react-router-dom';

import type { SiteRoutes, SiteRoute } from '../../types';

import Sidebar from '../sidebar/sidebar';
import { getRouteFromPath } from '../../routing-helpers';

import { Wrapper, Container } from './main.styles';

type Props = {
  routes: SiteRoutes,
  location: Location,
};

export default class Main extends Component<Props> {
  renderedRoutes: Array<Node>;

  constructor(props: Props) {
    super(props);

    this.renderedRoutes = props.routes.map(this.getRoute);
  }

  getRoute = (route: SiteRoute) => (
    <Route
      key={route.key}
      render={route.render}
      exact={route.exact}
      path={route.path}
    />
  )

  render() {
    const { routes, location } = this.props;

    const currentRoute = getRouteFromPath(routes, location.pathname);

    return (
      <Wrapper className="pure-u-1">
        <section className="pure-u-1 pure-u-md-3-4">
          <Container>
            <Switch location={location} key={location.key}>
              {this.renderedRoutes}
            </Switch>
          </Container>
        </section>

        <aside className="pure-u-1 pure-u-md-1-4">
          <Sidebar routes={routes} currentRoute={currentRoute} />
        </aside>
      </Wrapper>
    );
  }
}
