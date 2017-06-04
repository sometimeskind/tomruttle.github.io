// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';

import postArray from './require-posts';
import getPosts from './get-posts';
import pageContainer from './page-container';

import App from '../common/components/app';

import type { AppProps, Post } from '../common/types';

const posts: Array<Post> = getPosts(postArray);

function getMarkup({ location, props, assets, noClient }) {
  const sheet = new ServerStyleSheet();
  const context = {};
  const appMarkup = renderToString(sheet.collectStyles(
    <StaticRouter location={location} context={context}>
      <App {...props} />
    </StaticRouter>
  ));

  return pageContainer({ props, appMarkup, assets, path: location, styles: sheet.getStyleTags(), noClient });
}

export default function render(locals: { path: string, webpackStats: { hash: string }, assets: { [chunkName: string]: string } }) {
  const buildHash = locals.webpackStats.hash;
  const props: AppProps = { posts, buildHash };

  return {
    [locals.path]: getMarkup({ location: locals.path, props, assets: locals.assets, noClient: false }),
    '/404.html': getMarkup({ location: 'not-found', props, assets: locals.assets, noClient: true }),
  };
}
