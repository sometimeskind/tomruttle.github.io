// @flow

import type { RouterHistory } from 'react-router';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Swipeable from 'react-swipeable';

import type { SiteRoutes, CurrentRoute } from '../../types';

import Sidebar from '../sidebar/sidebar';
import { getRouteFromPath, getNewPathFromSwipe } from '../../routing-helpers';

import { Wrapper, Container, TransitionAnimation } from './main.styles';

export function swiped(history: RouterHistory, routes: SiteRoutes, currentRoute: CurrentRoute | null) {
  return (e: any, deltaX: number, deltaY: number, isFlick: bool) => {
    if (currentRoute && isFlick) {
      const newPath = getNewPathFromSwipe(routes, currentRoute, deltaX, deltaY);

      if (newPath) {
        history.push(newPath);
      }
    }
  };
}

export default function Main({ routes }: { routes: SiteRoutes }) {
  return (
    <Route
      render={({ location, history }) => {
        const currentRoute = getRouteFromPath(routes, location.pathname);

        return (
          <Wrapper className="pure-u-1">
            <section className="pure-u-1 pure-u-md-3-4">
              <Container>
                <Swipeable onSwiped={swiped(history, routes, currentRoute)}>
                  <TransitionAnimation>
                    <Switch location={location} key={location.key}>
                      {routes.map((route) => <Route {...route.toJS()} />)}
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
      }}
    />
  );
}
