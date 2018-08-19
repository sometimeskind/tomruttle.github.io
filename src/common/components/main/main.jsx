// @flow

import type { RouterHistory, Location } from 'react-router';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Swipeable from 'react-swipeable';

import type { SiteRoutes, CurrentRoute, SiteRoute } from '../../types';

import Sidebar from '../sidebar/sidebar';
import { getRouteFromPath, getNewPathFromSwipe } from '../../routing-helpers';

import { Wrapper, Container, TransitionAnimation } from './main.styles';

export function swiped(history: RouterHistory, routes: SiteRoutes, currentRoute: ?CurrentRoute) {
  return (e: SyntheticEvent<EventTarget>, deltaX: number, deltaY: number, isFlick: boolean) => {
    if (currentRoute && isFlick) {
      const newPath = getNewPathFromSwipe(routes, currentRoute, deltaX, deltaY);

      if (typeof newPath === 'string') {
        history.push(newPath);
      }
    }
  };
}

type Props = {
  routes: SiteRoutes,
  location: Location,
  history: RouterHistory,
};

export default class Main extends Component<Props> {
  getRoute = (route: SiteRoute) => (
    <Route
      key={route.key}
      render={route.render}
      exact={route.exact}
      path={route.path}
    />
  )

  render() {
    const { routes, location, history } = this.props;

    const currentRoute = getRouteFromPath(routes, location.pathname);

    return (
      <Wrapper className="pure-u-1">
        <section className="pure-u-1 pure-u-md-3-4">
          <Container>
            <Swipeable onSwiped={swiped(history, routes, currentRoute)}>
              <TransitionAnimation>
                <Switch location={location} key={location.key}>

                  {routes.map(this.getRoute)}

                </Switch>
              </TransitionAnimation>
            </Swipeable>
          </Container>
        </section>

        <aside className="pure-u-1 pure-u-md-1-4">
          <Sidebar routes={routes} currentRoute={currentRoute} />
        </aside>
      </Wrapper>
    );
  }
}
