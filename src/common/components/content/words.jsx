// @flow

/* eslint-disable react/no-danger */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import type { List, Record } from 'immutable';
import type { PostType } from '../../types';

import styles from './content.module.css';

function createMarkup(html) {
  return { __html: html };
}

function Words({ posts }: { posts: List<Record<PostType>> }) {
  return (
    <div className={styles.content}>
      <Switch>
        {posts.toJS().map(({ metadata, words }) => (
          <Route
            key={metadata.fileName}
            path={`/words/${metadata.path}/`}
            render={() => <section dangerouslySetInnerHTML={createMarkup(words)} />}
          />
        ))}
        <Route
          render={() => (
            <section>
              <h4>Words</h4>
              <p>Select a post and read it, fool!</p>
            </section>
          )}
        />
      </Switch>
    </div>
  );
}

export default withStyles(styles)(Words);
