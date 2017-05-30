// @flow

import React, { PureComponent } from 'react';

import DangerousSection from './dangerous-section';

import notFoundText from '../../../../pages/not-found.md';

export default class NotFound extends PureComponent {
  render() {
    return <DangerousSection content={notFoundText} />;
  }
}
