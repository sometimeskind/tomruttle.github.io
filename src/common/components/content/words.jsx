// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import type { List, Map } from 'immutable';
import type { Post } from '../../types';

import styles from './content.module.css';

import DangerousSection from './dangerous-section';

import wordsIntro from '../../../../pages/words-intro.md';

function Words({ posts }: { posts: List<Map<Post>> }) {
  return (
    <div className={styles.content}>
      <Switch>
        {posts.map((post) => (
          <Route
            key={post.getIn(['metadata', 'fileName'])}
            path={`/words/${post.getIn(['metadata', 'path'])}/`}
            render={() => <DangerousSection content={post.get('words')} />}
          />
        ))}
        <Route render={() => <DangerousSection content={wordsIntro} />} />
      </Switch>
    </div>
  );
}

export default withStyles(styles)(Words);
