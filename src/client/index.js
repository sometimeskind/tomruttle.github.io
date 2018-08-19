// @flow

import 'babel-polyfill';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import App from '../common/components/app';
import ClientWrapper from './components/client-wrapper';

import './require-assets';

import type { AppProps } from '../common/types';

function logException(ex, context) {
  if (window.Raven) {
    window.Raven.captureException(ex, { extra: context });
  } else {
    /* eslint-disable no-console */

    console.error(ex);
  }
}

function setPageTitle(title) {
  window.document.title = title;
}

const container = window.document.getElementById(APP_CONTAINER);

if (container) {
  const props: AppProps = window[APP_STATE_PROP];

  const app = (
    <BrowserRouter>
      <ClientWrapper logException={logException}>
        <App posts={props.posts} setPageTitle={setPageTitle} />
      </ClientWrapper>
    </BrowserRouter>
  );

  ReactDOM.hydrate(app, container, (err) => {
    if (err) { logException(err, { message: 'React render failed.' }); }

    if ('serviceWorker' in window.navigator) {
      window.addEventListener('load', () => {
        window.navigator.serviceWorker.register(`/sw.js?${props.buildHash}`)
          .catch((swErr) => logException(swErr, { message: 'Service worker registry failed.' }));
      });
    }
  });
}
