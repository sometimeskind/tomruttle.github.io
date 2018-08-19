// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';

import postArray from './require-posts';
import getPosts from './get-posts';
import pageContainer from './page-container';
import { getAllPaths } from '../common/routing-helpers';

import getRoutes from '../common/routes';
import App from '../common/components/app';

import type { AppProps } from '../common/types';

import { DEFAULT_TITLE } from '../common/constants';

const posts = getPosts(postArray);

function getMarkup(getMarkupArgs) {
  const {
    location,
    props,
    assets,
    noClient,
  } = getMarkupArgs;

  const sheet = new ServerStyleSheet();
  const context = {};

  let pageTitle = DEFAULT_TITLE;

  function setPageTitle(title) {
    pageTitle = title;
  }

  const app = (
    <StaticRouter location={location} context={context}>
      <App {...props} setPageTitle={setPageTitle} />
    </StaticRouter>
  );

  const appMarkup = renderToString(sheet.collectStyles(app));

  return pageContainer({
    props,
    appMarkup,
    assets,
    path: location,
    styles: sheet.getStyleTags(),
    noClient,
    pageTitle,
    isProduction: process.env.NODE_ENV === 'production',
  });
}

function generateSiteMap() {
  const routes = getRoutes(posts);

  return getAllPaths(routes)
    .map((path) => `https://www.tomruttle.com${path}`)
    .join('\n');
}

type LocalsType = {
  path: string,
  webpackStats: { hash: string },
  assets: { [chunkName: string]: string },
};

export default function render(locals: LocalsType) {
  const buildHash = locals.webpackStats.hash;
  const props: AppProps = { posts, buildHash };

  return {
    [locals.path]: getMarkup({
      location: locals.path,
      props,
      assets: locals.assets,
      noClient: false,
    }),

    '/404.html': getMarkup({
      location: 'not-found',
      props,
      assets: locals.assets,
      noClient: true,
    }),

    '/sitemap.html': generateSiteMap(),
  };
}
