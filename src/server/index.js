// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import postArray from './require-posts';
import getPosts from './get-posts';
import pageContainer from './page-container';

import App from '../common/components/app';
import ServerWrapper from './components/server-wrapper';

import type { AppProps, Post } from '../common/types';

const posts: Array<Post> = getPosts(postArray);

function getMarkup({ location, props, assets, noClient }) {
  const css = new Set();
  const context = {};
  const appMarkup = renderToString(
    <StaticRouter location={location} context={context}>
      <ServerWrapper css={css} children={<App {...props} />} />
    </StaticRouter>
  );

  return pageContainer({ props, appMarkup, assets, path: location, styles: Array.from(css).join(''), noClient });
}

export default function render(locals: { path: string, webpackStats: { hash: string }, assets: { [chunkName: string]: string } }) {
  const buildHash = locals.webpackStats.hash;
  const props: AppProps = { posts, buildHash };

  return {
    [locals.path]: getMarkup({ location: locals.path, props, assets: locals.assets, noClient: false }),
    '/404.html': getMarkup({ location: 'not-found', props, assets: locals.assets, noClient: true }),
  };
}
