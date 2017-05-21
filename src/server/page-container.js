// @flow

import serialize from 'serialize-javascript';

import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import type { AppPropsType } from '../common/types';

export default (props: AppPropsType, appMarkup: string) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="A homepage for Tom Ruttle" />

      <title>HELLO</title>

      <link rel="icon" type="image/png" href="https://emojipedia-us.s3.amazonaws.com/cache/7d/1c/7d1c2a029746effc30399feaddcc0007.png" />
      <link rel="stylesheet" type="text/css" href="/css/main.css">
    </head>
    <body>
      <div id="${APP_CONTAINER}">${appMarkup}</div>
      <script type="text/javascript">
        window["${APP_STATE_PROP}"]=${serialize(props, { json: true })}
      </script>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" integrity="sha256-2nu8qdFj9AM9XRd75EAp3XRGEKiRprWL4hPMhYkj150=" crossorigin="anonymous"></script>

      ${process.env.NODE_ENV === 'production' ? `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js" integrity="sha256-lLTXVU5NHLl101VgD3LswV6ZgI2PjSjZ5dVzhBcq52k=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js" integrity="sha256-4DRNdBX+quo7fRIFuR9yhr157hq/9FcAsHRDNQEXZSM=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/4.1.1/react-router.min.js" integrity="sha256-MeY9WmJInnn/hYw4NWDwfAgJ7APJxZZeRZX8hzjPvLw=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.1.1/react-router-dom.min.js" integrity="sha256-rHZKWvuytV/U6FmleC31neSgHS78pzsgr8w1qCpnBvc=" crossorigin="anonymous"></script>
      ` : `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.js" integrity="sha256-+a1U3leOoQWu+wLhpzuq+Gz08fegl1IZmEGs9xTbkjM=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.js" integrity="sha256-JjPaFvHLm1SN5IHz2P4J0+rGj8ajlzuslG03yZLEDoU=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/4.1.1/react-router.js" integrity="sha256-ehWuwktfbia1v9qMbE/SiPx+FcxT+Pr1/eKaZWDP7Y4=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.1.1/react-router-dom.js" integrity="sha256-/d3M+20uJ4+y9J4fuE2BAoFPU+inA9OfwmF7ZuzOoN8=" crossorigin="anonymous"></script>
      `}

      <script async src="/js/main.js"></script>

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
