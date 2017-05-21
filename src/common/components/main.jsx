// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Words from './words';
import WordsMenu from './words-menu';

import type { PostType } from '../types';

function Main({ posts }: { posts: Array<PostType> }) {
  return (
    <div>
      <section className="content pure-u-1 pure-u-md-3-5">
        <Route exact path="/" component={Home} />
        <Route path="/words/:path?" render={() => <Words posts={posts} />} />
      </section>

      <aside className="pure-u-1 pure-u-md-2-5">
        <Switch>
          <Route
            path="/words/:path?"
            render={() => (
              <div className="sidenav">
                <WordsMenu posts={posts} />
              </div>
            )}
          />
          <Route render={() => <div className="sidenav no-content pure-u-1 pure-u-md-2-5" />} />
        </Switch>
      </aside>
    </div>
  );
}

export default Main;
