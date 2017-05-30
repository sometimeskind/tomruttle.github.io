// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { List, Map } from 'immutable';
import type { Post } from '../../types';

import DangerousSection from './dangerous-section';

import wordsIntro from '../../../../pages/words-intro.md';

export default function Words({ posts }: { posts: List<Map<Post>> }) {
  return (
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
  );
}
