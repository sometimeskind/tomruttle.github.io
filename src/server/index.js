// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import postArray from './require-posts';
import getPosts from './get-posts';
import pageContainer from './page-container';

import App from '../common/components/app';

import type { AppPropsType } from '../common/types';

const posts = getPosts(postArray);

export default function render(locals: { path: string, filenames?: Array<string>, webpackStats: { hash: string, compilation: { assets: { [filename: string]: string } } } }) {
  const context = {};

  const props: AppPropsType = { posts, buildHash: locals.webpackStats.hash };

  const appMarkup = renderToString(
    <StaticRouter
      location={locals.path}
      context={context}
    ><App {...props} /></StaticRouter>
  );

  const filenames = locals.filenames || Object.keys(locals.webpackStats.compilation.assets);

  const assets = {
    vendorJS: filenames.find((asset) => asset.startsWith('vendor.') && asset.endsWith('.js')) || null,
    mainJS: filenames.find((asset) => asset.startsWith('main.') && asset.endsWith('.js')) || 'main.js',
    mainCSS: filenames.find((asset) => asset.startsWith('main.') && asset.endsWith('.css')) || 'main.css',
  };

  return {
    [locals.path]: pageContainer({ props, appMarkup, assets, path: locals.path }),
    '/404.html': renderToString(<div>Not Found, bro!</div>),
  };
}
