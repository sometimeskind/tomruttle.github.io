// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Swipeable from 'react-swipeable';

import type { SiteRoutes } from '../../types';

import WordsMenu from '../sidebar/words-menu';
import swiped from './swipe-action';

import { getCurrentRouteIndex, findRoute } from '../../routing-helpers';

import { routeKeys } from '../../constants';

import { Wrapper, Container, TransitionAnimation } from './main.styles';

export default function Main({ routes }: { routes: SiteRoutes }) {
  const links = routes.filter((route) => route.get('title'));
  const wordsRoute = findRoute(links, routeKeys.WORDS);

  return (
    <Wrapper className="pure-u-1">
      <section className="pure-u-1 pure-u-md-3-4">
        <Container>
          <Route
            render={({ location, history }) => {
              const currentRouteIndex = getCurrentRouteIndex(links, location.pathname);

              return (
                <Swipeable onSwiped={swiped(history, links, currentRouteIndex)}>
                  <TransitionAnimation>
                    <Switch location={location} key={location.key}>
                      {routes.map((route) => <Route key={`main-${route.get('key')}`} {...route.toJS()} />)}
                    </Switch>
                  </TransitionAnimation>
                </Swipeable>
              );
            }}
          />
        </Container>
      </section>

      <aside className="pure-u-1 pure-u-md-1-4">
        <Switch>
          <Route path={wordsRoute.get('path')} render={() => <WordsMenu routes={wordsRoute.get('routes')} />} />
        </Switch>
      </aside>
    </Wrapper>
  );
}
