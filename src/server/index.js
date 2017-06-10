// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';

import postArray from './require-posts';
import getPosts from './get-posts';
import pageContainer from './page-container';

import getRoutes from '../common/routes';
import App from '../common/components/app';

import type { AppProps, Post } from '../common/types';

import { DEFAULT_TITLE } from '../common/constants';

const posts: Array<Post> = getPosts(postArray);

function getMarkup({ location, props, assets, noClient }) {
  const sheet = new ServerStyleSheet();
  const context = {};

  let pageTitle = DEFAULT_TITLE;

  function setPageTitle(title) {
    pageTitle = title;
  }

  const appMarkup = renderToString(sheet.collectStyles(
    <StaticRouter location={location} context={context}>
      <App {...props} setPageTitle={setPageTitle} />
    </StaticRouter>
  ));

  return pageContainer({ props, appMarkup, assets, path: location, styles: sheet.getStyleTags(), noClient, pageTitle });
}

function generateSiteMap() {
  const thing = getRoutes({ posts, setPageTitle: () => {} });

  function getPaths(routes) {
    return routes.reduce((paths, route) => {
      const path = route.get('path');
      const subRoutes = route.get('routes');
      const newPaths = subRoutes ? getPaths(subRoutes) : path;
      return paths.concat(newPaths);
    }, []);
  }

  return getPaths(thing)
    .filter(Boolean)
    .map((path) => `https://www.tomruttle.com${path}`)
    .join('\n');
}

export default function render(locals: { path: string, webpackStats: { hash: string }, assets: { [chunkName: string]: string } }) {
  const buildHash = locals.webpackStats.hash;
  const props: AppProps = { posts, buildHash };

  return {
    [locals.path]: getMarkup({ location: locals.path, props, assets: locals.assets, noClient: false }),
    '/404.html': getMarkup({ location: 'not-found', props, assets: locals.assets, noClient: true }),
    '/sitemap.html': generateSiteMap(),
  };
}
