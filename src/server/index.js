// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { APP_CONTAINER } from '../common/constants';

import App from '../common/components/app';

export default function render(locals: { path: string }) {
  const context = {};

  const appMarkup = renderToString(
    <StaticRouter
      location={locals.path}
      context={context}
    ><App /></StaticRouter>
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>tomruttle.com</title>

        <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/pure-min.css" integrity="sha384-UQiGfs9ICog+LwheBSRCt1o5cbyKIHbwjWscjemyBMT9YCUMZffs6UqUTd0hObXD" crossorigin="anonymous">
        <!--[if lte IE 8]>
          <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/grids-responsive-old-ie-min.css">
        <![endif]-->
        <!--[if gt IE 8]><!-->
          <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/grids-responsive-min.css">
        <!--<![endif]-->

        <link rel="stylesheet" type="text/css" href="/css/main.css">
      </head>
      <body>
        <div id="${APP_CONTAINER}" class="container">${appMarkup}</div>
        <script async src="/js/main.js"></script>
      </body>
    </html>
  `;
}
