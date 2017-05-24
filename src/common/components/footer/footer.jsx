// @flow

import React, { PureComponent } from 'react';

import pure from 'purecss/build/pure.css';
import responsive from 'purecss/build/grids-responsive.css';

import offset from '../../../../assets/css/offsets.css';

import styles from './footer.css';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className={`${styles.footer} ${pure['pure-u-1']} ${offset['offset-md-1-4']} ${responsive['pure-u-md-3-4']}`}>
        <a href="https://twitter.com/tomruttle" className={styles['twitter-button']} target="_blank" rel="me noopener noreferrer">Twitter: @tomruttle</a>
        <a href="https://github.com/tomruttle" className={styles['github-button']} target="_blank" rel="me noopener noreferrer">Github: @tomruttle</a>
      </footer>
    );
  }
}
