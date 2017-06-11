// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { fromJS } from 'immutable';

import type { RouteObj, Post, SetPageTitle, SiteRoutes, SiteRoute } from './types';

import wordsIntro from '../../pages/words-intro.md';
import page from '../../pages/home.md';
import notFoundText from '../../pages/not-found.md';

import { routeKeys } from './constants';

import DangerousSection from './components/dangerous-section';

export function getNotFoundRoute(setPageTitle?: SetPageTitle = () => {}): SiteRoute {
  const notFoundRoute = {
    key: routeKeys.NOT_FOUND,
    render() {
      setPageTitle('Page Not Found. :(');
      return <DangerousSection content={notFoundText} />;
    },
  };

  return fromJS(notFoundRoute);
}

export default function getRoutes(posts: Array<Post>, setPageTitle?: SetPageTitle = () => {}): SiteRoutes {
  const wordsRoutes: Array<RouteObj> = posts.map((post) => ({
    key: `words-${post.metadata.path}`,
    path: `/words/${post.metadata.path}/`,
    title: post.metadata.title,
    render() {
      setPageTitle(post.metadata.title);
      return <DangerousSection content={post.words} />;
    },
  }));

  const wordsIntroRoute = {
    key: routeKeys.WORDS_INTRO,
    render() {
      setPageTitle('Words');
      return <DangerousSection content={wordsIntro} />;
    },
  };

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
            {[...wordsRoutes, wordsIntroRoute].map((route) => <Route {...route} />)}
          </Switch>
        );
      },
      routes: wordsRoutes,
    },
  ];

  return fromJS(routes);
}
