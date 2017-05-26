// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import postArray from './require-posts';
import getPosts from './get-posts';
import pageContainer from './page-container';

import App from '../common/components/app';
import ServerWrapper from './components/server-wrapper';

import type { AppPropsType } from '../common/types';

const posts = getPosts(postArray);

export default function render(locals: { path: string, webpackStats: { hash: string }, assets: { [chunkName: string]: string } }) {
  const context = {};

  const props: AppPropsType = { posts, buildHash: locals.webpackStats.hash };

  const css = new Set();

  const appMarkup = renderToString(
    <StaticRouter location={locals.path} context={context}>
      <ServerWrapper css={css} children={<App {...props} />} />
    </StaticRouter>
  );

  return {
    [locals.path]: pageContainer({ props, appMarkup, assets: locals.assets, path: locals.path, styles: Array.from(css).join('') }),
    '/404.html': renderToString(<div>Not Found, bro!</div>),
  };
}
