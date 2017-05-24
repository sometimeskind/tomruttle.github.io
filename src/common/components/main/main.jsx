// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { List, Record } from 'immutable';

import pure from 'purecss/build/pure.css';
import responsive from 'purecss/build/grids-responsive.css';

import Home from '../content/home';
import Words from '../content/words';
import WordsMenu from '../sidebar/words-menu';

import type { PostType } from '../../types';

import styles from './main.css';

function Main({ posts }: { posts: List<Record<PostType>> }) {
  return (
    <div className={`${styles.main} ${pure['pure-u-1']}`}>
      <section className={`${styles.content} ${pure['pure-u-1']} ${responsive['pure-u-md-3-4']}`}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/words/:path?" render={() => <Words posts={posts} />} />
        </Switch>
      </section>

      <aside className={`${styles.sidebar} ${pure['pure-u-1']} ${responsive['pure-u-md-1-4']}`}>
        <Switch>
          <Route path="/words/:path?" render={() => <WordsMenu posts={posts} />} />
        </Switch>
      </aside>
    </div>
  );
}

export default Main;
