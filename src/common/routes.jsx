import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { fromJS } from 'immutable';

import wordsIntro from '../../pages/words-intro.md';
import page from '../../pages/home.md';
import notFoundText from '../../pages/not-found.md';

import DangerousSection from './components/dangerous-section';

export default function getRoutes({ posts, setPageTitle }) {
  const wordsRoutes = [
    ...posts.map((post) => ({
      key: post.metadata.fileName,
      path: `/words/${post.metadata.path}/`,
      title: post.metadata.title,
      render() {
        setPageTitle(post.metadata.title);
        return <DangerousSection content={post.words} />;
      },
    })),
    {
      key: 'intro',
      render() {
        setPageTitle('Words');
        return <DangerousSection content={wordsIntro} />;
      },
    },
  ];

  return fromJS([
    {
      key: 'home',
      exact: true,
      path: '/',
      title: 'Home',
      render() {
        setPageTitle('YOOOOOOO');
        return <DangerousSection content={page} />;
      },
    },
    {
      key: 'words',
      path: '/words/:path?',
      title: 'Words',
      render() {
        return (
          <Switch>
            {wordsRoutes.map((route) => <Route key={`words-${route.key}`} {...route} />)}
          </Switch>
        );
      },
      routes: wordsRoutes,
    },
    {
      key: 'not-found',
      render() {
        setPageTitle('Page Not Found. :(');
        return <DangerousSection content={notFoundText} />;
      },
    },
  ]);
}
