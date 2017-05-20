// @flow

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { APP_CONTAINER } from '../common/constants';

import App from '../common/components/app';

import './main.css';

const container = document.getElementById(APP_CONTAINER);

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), container, () => {
  console.log('app rendered');
});
