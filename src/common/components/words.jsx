// @flow

/* eslint-disable react/no-danger */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { PostType } from '../types';

function createMarkup(html) {
  return { __html: html };
}

function Words({ posts }: { posts: Array<PostType> }) {
  return (
    <Switch>
      {posts.map(({ metadata, words }) => (
        <Route
          key={metadata.fileName}
          path={`/words/${metadata.path}`}
          render={() => <section dangerouslySetInnerHTML={createMarkup(words)} />}
        />
      ))}
      <Route
        render={() => (
          <section>
            <h4>Words</h4>
            <p>Select a post from the left-hand menu, fool!</p>
          </section>
        )}
      />
    </Switch>
  );
}

export default Words;
