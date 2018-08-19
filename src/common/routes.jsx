// @flow

import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { fromJS } from 'immutable';

import type {
  RouteObj,
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
      path={route.path}
    />
  );
}

export default function getRoutes(posts: Array<Post>, setPageTitle?: SetPageTitle = () => {}): SiteRoutes {
  function getPost(post) {
    return {
      key: `words-${post.metadata.path}`,
      path: `/words/${post.metadata.path}/`,
      title: post.metadata.title,
      render() {
        setPageTitle(post.metadata.title);
        return <DangerousSection content={post.words} />;
      },
    };
  }

  const wordsRoutes: Array<RouteObj> = [
    ...posts.map(getPost),
    {
      key: routeKeys.WORDS_INTRO,
      render() {
        setPageTitle('Words');
        return <DangerousSection content={wordsIntro} />;
      },
    },
  ];

  const routes: Array<RouteObj> = [
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
      render() {
        setPageTitle('Page Not Found. :(');
        return <DangerousSection content={notFoundText} />;
      },
    },
  ];

  return fromJS(routes);
}
