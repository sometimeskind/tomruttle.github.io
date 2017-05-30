// @flow

import React, { PureComponent } from 'react';

import DangerousSection from './dangerous-section';

import page from '../../../../pages/home.md';

export default class Home extends PureComponent {
  render() {
    return <DangerousSection content={page} />;
  }
}
