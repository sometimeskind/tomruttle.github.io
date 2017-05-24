// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './content/home';
import Words from './content/words';
import WordsMenu from './sidebar/words-menu';

import type { PostType } from '../types';

function Main({ posts }: { posts: Array<PostType> }) {
  return (
    <div className="main clear-fix pure-u-1">
      <section className="main__content pure-u-1 pure-u-md-3-4">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/words/:path?" render={() => <Words posts={posts} />} />
        </Switch>
      </section>

      <aside className="main__sidebar pure-u-1 pure-u-md-1-4">
        <Switch>
          <Route path="/words/:path?" render={() => <WordsMenu posts={posts} />} />
        </Switch>
      </aside>
    </div>
  );
}

export default Main;
