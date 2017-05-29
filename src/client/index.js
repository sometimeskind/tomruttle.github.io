// @flow

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import App from '../common/components/app';
import ClientWrapper from './components/client-wrapper';

import './require-assets';

import type { AppProps } from '../common/types';

const container = document.getElementById(APP_CONTAINER);

const props: AppProps = window[APP_STATE_PROP];

function logException(ex, context) {
  if (window.Raven) {
    window.Raven.captureException(ex, { extra: context });
  } else {
    console.error(ex); // eslint-disable-line no-console
  }
}

const css = new Set();

const app = (
  <BrowserRouter>
    <ClientWrapper css={css} children={<App {...props} />} />
  </BrowserRouter>
);

render(app, container, (err) => {
  if (err) { logException(err, { message: 'React render failed.' }); }

  if ('serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
      window.navigator.serviceWorker.register(`/sw.js?${props.buildHash}`)
        .catch((swErr) => logException(swErr, { message: 'Service worker registry failed.' }));
    });
  }
});
