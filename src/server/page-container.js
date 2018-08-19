// @flow

import serialize from 'serialize-javascript';
import crypto from 'crypto-js';

import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import type { AppProps } from '../common/types';

const description = 'A homepage for Tom Ruttle';

const article = /* @html */`
  <meta property="og:type" content="article" />
  <meta property="article:author" content="https://www.twitter.com/tomruttle">
`;

const website = /* @html */`
  <meta property="og:type" content="website" />
`;

const sentry = /* @html */`
  <script src="https://cdn.ravenjs.com/3.17.0/raven.min.js" crossorigin="anonymous"></script>
  <script type="text/javascript">
    window.Raven.config('https://6d7076eb61934dac9021766cafb4d1d1@sentry.io/171507').install();
  </script>
`;

const analytics = /* @html */`
  <script>
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', 'UA-76848132-1', 'auto');
    ga('set', 'forceSSL', true);
    ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>
`;

type GetPageContainerArgsType = {
  pageTitle: string,
  noClient: boolean,
  props: AppProps,
  appMarkup: string,
  assets: { [chunkName: string]: string },
  path: string,
  styles: string,
  isProduction: boolean,
};

export default function getPageContainer(getPageContainerArgs: GetPageContainerArgsType) {
  const {
    props,
    appMarkup,
    assets,
    path,
    styles,
    noClient,
    pageTitle,
    isProduction,
  } = getPageContainerArgs;

  const propsFuncString = `window["${APP_STATE_PROP}"]=${serialize(props, { json: true })};`;

  return /* @html */`
    <!DOCTYPE html>
    <html lang="en">
      <head prefix="og: http://ogp.me/ns#${path.includes('/words/') ? ' article: http://ogp.me/ns/article#' : ''}">
        <meta charset="UTF-8" />

        <meta http-equiv="Content-Security-Policy" content="
          default-src 'self';
          style-src 'unsafe-inline';
          img-src
            'self'
            https://www.google-analytics.com;
          connect-src
            'self'
            https://sentry.io;
          script-src
            'self'
            data:
            https://www.google-analytics.com
            https://cdn.ravenjs.com
            'sha256-SbkII2pDL2DBfAUarDUDN33xTz3ZlGTCn6mTAK32OXg='
            'sha256-AxPj8j1FANOzGFl4BMawrC47yfyMXbAUkIuptYsYGnE='
            'sha256-UvUK5+eiBNqX6peExEASumNRzjBU/y2KmMgaW0Kxhvo='
            'sha256-xcoIXlwfy346mx6BiCq9+t784AV3nKtsZEOqk4D6WK0='
            'sha256-${crypto.enc.Base64.stringify(crypto.SHA256(propsFuncString))}';
        " />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${description}" />
        <meta name="theme-color" content="#fff" />

        <meta name="twitter:site" content="@tomruttle" />
        <meta name="twitter:creator" content="@tomruttle" />

        ${path.includes('/words/') ? article : website}

        <meta property="og:url" content="https://www.tomruttle.com${path}" />
        <meta property="og:title" content="${pageTitle}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="https://www.tomruttle.com/images/monster.b8494.jpeg" />

        <title>${pageTitle} - tomruttle.com</title>

        <link rel="icon" type="image/png" href="/images/monster-icon.d119b2.png" />
        <link rel="manifest" href="/manifest.json">
        <style type="text/css">${styles}</style>
      </head>

      <body>
        <div id="${APP_CONTAINER}">${appMarkup}</div>

        ${isProduction ? sentry : ''}

        <script type="text/javascript">${propsFuncString}</script>

        ${noClient ? '' : /* @html */`
          <script src="/${assets.runtime}"></script>
          <script src="/${assets.vendor}"></script>
          <script src="/${assets.main}"></script>
        `}

        ${isProduction ? analytics : ''}
      </body>
    </html>
  `;
}
