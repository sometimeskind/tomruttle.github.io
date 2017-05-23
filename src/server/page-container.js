// @flow

import serialize from 'serialize-javascript';

import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import type { AppPropsType } from '../common/types';

export type assetsType = {
  mainJS: string,
  mainCSS: string,
  vendorJS: ?string,
}

const description = 'A homepage for Tom Ruttle';
const title = 'HELLO';

export default ({ props, appMarkup, assets }: { props: AppPropsType, appMarkup: string, assets: assetsType }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="${description}" />

      <meta name="twitter:site" content="@tomruttle" />
      <meta name="twitter:creator" content="@tomruttle" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.tomruttle.com/" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="https://www.tomruttle.com/images/monster.b8494.jpeg" />

      <title>${title}</title>

      <link rel="icon" type="image/png" href="https://www.tomruttle.com/images/monster-icon.d119b2.png" />
      <link rel="stylesheet" type="text/css" href="/${assets.mainCSS}">
    </head>
    <body>
      <div id="${APP_CONTAINER}">${appMarkup}</div>
      <script type="text/javascript">
        window["${APP_STATE_PROP}"]=${serialize(props, { json: true })}
      </script>

      ${assets.vendorJS ? `<script src="/${assets.vendorJS}"></script>` : ''}
      <script async src="/${assets.mainJS}"></script>

      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-76848132-1', 'auto');
        ga('set', 'forceSSL', true);
        ga('send', 'pageview');
      </script>
    </body>
  </html>
`;
