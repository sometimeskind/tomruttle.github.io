// @flow

import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './content.module.css';

class Home extends PureComponent {
  render() {
    return (
      <div className={styles.content}>
        <p>Couldn&apos;t find anything here, friend!</p>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
