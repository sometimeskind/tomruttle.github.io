// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { Posts, SetPageTitle } from '../../types';

import DangerousSection from './dangerous-section';

import wordsIntro from '../../../../pages/words-intro.md';

export default function Words({ posts, setPageTitle }: { posts: Posts, setPageTitle: SetPageTitle }) {
  return (
    <Switch>
      {posts.map((post) => (
        <Route
          key={post.getIn(['metadata', 'fileName'])}
          path={`/words/${String(post.getIn(['metadata', 'path']))}/`}
          render={() => {
            setPageTitle(String(post.getIn(['metadata', 'title'])));
            return <DangerousSection content={String(post.get('words'))} />;
          }}
        />
      ))}
      <Route
        render={() => {
          setPageTitle('Words');
          return <DangerousSection content={wordsIntro} />;
        }}
      />
    </Switch>
  );
}
