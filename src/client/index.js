// @flow

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import App from '../common/components/app';

import './main.css';

import type { AppPropsType } from '../common/types';

const container = document.getElementById(APP_CONTAINER);

const props: AppPropsType = window[APP_STATE_PROP];

render((
  <BrowserRouter>
    <App {...props} />
  </BrowserRouter>
), container, () => {
  console.log('app rendered');
});
