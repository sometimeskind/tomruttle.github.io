// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Swipeable from 'react-swipeable';

import type { SiteRoutes, SiteRoute } from '../../types';

import WordsMenu from '../sidebar/words-menu';

import { Wrapper, Container, TransitionAnimation } from './main.styles';

function swiped(history) {
  return (e, deltaX, deltaY, isFlick) => {
    if (isFlick) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const horizontal = absX > absY;

      if (horizontal) {
        if (deltaX > 0) {
          history.push('/words/');
        } else {
          history.push('/');
        }
      }
    }
  };
}

export default function Main({ routes }: { routes: SiteRoutes }) {
  const wordsRoute: SiteRoute = routes.filter((route) => route.get('key') === 'words').get(0);

  return (
    <Wrapper className="pure-u-1">
      <section className="pure-u-1 pure-u-md-3-4">
        <Container>
          <Route
            render={({ location, history }) => (
              <Swipeable onSwiped={swiped(history)}>
                <TransitionAnimation>
                  <Switch location={location} key={location.key}>
                    {routes.map((route) => <Route key={`main-${route.get('key')}`} {...route.toJS()} />)}
                  </Switch>
                </TransitionAnimation>
              </Swipeable>
            )}
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
