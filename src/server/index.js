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

export default function render(locals: { path: string }) {
  const context = {};

  const props: AppPropsType = { posts };

  const appMarkup = renderToString(
    <StaticRouter
      location={locals.path}
      context={context}
    ><App {...props} /></StaticRouter>
  );

  return pageContainer(props, appMarkup);
}
