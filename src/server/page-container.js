// @flow

import serialize from 'serialize-javascript';

import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import type { AppPropsType } from '../common/types';

export default ({ props, appMarkup, jsFilename, cssFilename }: { props: AppPropsType, appMarkup: string, jsFilename: string, cssFilename: string }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="A homepage for Tom Ruttle" />

      <title>HELLO</title>

      <link rel="icon" type="image/png" href="https://emojipedia-us.s3.amazonaws.com/cache/7d/1c/7d1c2a029746effc30399feaddcc0007.png" />
      <link rel="stylesheet" type="text/css" href="/${cssFilename}">
    </head>
    <body>
      <div id="${APP_CONTAINER}">${appMarkup}</div>
      <script type="text/javascript">
        window["${APP_STATE_PROP}"]=${serialize(props, { json: true })}
      </script>

      <script async src="/${jsFilename}"></script>

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
