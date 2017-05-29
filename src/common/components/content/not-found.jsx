// @flow

import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './content.module.css';

import DangerousSection from './dangerous-section';

import notFoundText from '../../../../pages/not-found.md';

class NotFound extends PureComponent {
  render() {
    return (
      <div className={styles.content}>
        <DangerousSection content={notFoundText} />
      </div>
    );
  }
}

export default withStyles(styles)(NotFound);
