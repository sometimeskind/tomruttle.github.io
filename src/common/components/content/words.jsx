// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { Posts } from '../../types';

import DangerousSection from './dangerous-section';

import wordsIntro from '../../../../pages/words-intro.md';

export default function Words({ posts }: { posts: Posts }) {
  return (
    <Switch>
      {posts.map((post) => (
        <Route
          key={post.getIn(['metadata', 'fileName'])}
          path={`/words/${String(post.getIn(['metadata', 'path']))}/`}
          render={() => <DangerousSection content={String(post.get('words'))} />}
        />
      ))}
      <Route render={() => <DangerousSection content={wordsIntro} />} />
    </Switch>
  );
}
