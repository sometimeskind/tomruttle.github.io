// @flow

import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './footer.module.css';

class Footer extends PureComponent {
  render() {
    return (
      <footer className={styles.footer}>
        <a href="https://twitter.com/tomruttle" className={styles['twitter-button']} target="_blank" rel="me noopener noreferrer">Twitter: @tomruttle</a>
        <a href="https://github.com/tomruttle" className={styles['github-button']} target="_blank" rel="me noopener noreferrer">Github: @tomruttle</a>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
