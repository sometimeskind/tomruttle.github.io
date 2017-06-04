// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Swipeable from 'react-swipeable';

import type { Posts } from '../../types';

import Home from '../content/home';
import Words from '../content/words';
import WordsMenu from '../sidebar/words-menu';
import NotFound from '../content/not-found';

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

export default function Main({ posts }: { posts: Posts }) {
  return (
    <Wrapper className="pure-u-1">
      <section className="pure-u-1 pure-u-md-3-4">
        <Container>
          <Route
            render={({ location, history }) => (
              <Swipeable onSwiped={swiped(history)}>
                <TransitionAnimation>
                  <Switch location={location} key={location.key}>
                    <Route exact path="/" component={Home} />
                    <Route path="/words/:path?" render={() => <Words posts={posts} />} />
                    <Route component={NotFound} />
                  </Switch>
                </TransitionAnimation>
              </Swipeable>
            )}
          />
        </Container>
      </section>

      <aside className="pure-u-1 pure-u-md-1-4">
        <Switch>
          <Route path="/words/:path?" render={() => <WordsMenu posts={posts} />} />
        </Switch>
      </aside>
    </Wrapper>
  );
}
