// @flow

import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import type {
  Post,
  SetPageTitle,
  SiteRoutes,
} from './types';

import wordsIntro from '../../pages/words-intro.md';
import page from '../../pages/home.md';
import notFoundText from '../../pages/not-found.md';

import { routeKeys } from './constants';

class DangerousSection extends PureComponent<{ content: string }> {
  render() {
    const { content } = this.props;

    /* eslint-disable react/no-danger */
    return <section dangerouslySetInnerHTML={{ __html: content }} />;
  }
}

function getRoute(route) {
  return (
    <Route
      key={route.key}
      render={route.render}
      exact={route.exact}
      path={typeof route.path === 'string' ? route.path : ''}
    />
  );
}

export default function getRoutes(posts: Array<Post>, setPageTitle?: SetPageTitle = () => {}): SiteRoutes {
  const wordsRoutes = [
    ...posts.map((post) => ({
      key: `words-${post.metadata.path}`,
      exact: false,
      path: `/words/${post.metadata.path}/`,
      title: post.metadata.title,
      render() {
        setPageTitle(post.metadata.title);
        return <DangerousSection content={post.words} />;
      },
    })),

    {
      key: routeKeys.WORDS_INTRO,
      exact: false,
      render() {
        setPageTitle('Words');
        return <DangerousSection content={wordsIntro} />;
      },
    },
  ];

  return [
    {
      key: routeKeys.HOME,
      exact: true,
      path: '/',
      title: 'Home',
      render() {
        setPageTitle('YOOOOOOO');
        return <DangerousSection content={page} />;
      },
    },

    {
      key: routeKeys.WORDS,
      exact: false,
      path: '/words/:path?',
      title: 'Words',
      render() {
        return (
          <Switch>
            {wordsRoutes.map(getRoute)}
          </Switch>
        );
      },
      sidebarHeader: 'Posts List',
      routes: wordsRoutes,
    },

    {
      key: routeKeys.NOT_FOUND,
      exact: false,
      render() {
        setPageTitle('Page Not Found. :(');
        return <DangerousSection content={notFoundText} />;
      },
    },
  ];
}
