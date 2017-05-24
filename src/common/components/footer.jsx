// @flow

import React, { PureComponent } from 'react';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer pure-u-1 offset-md-1-4 pure-u-md-3-4">
        <a href="https://twitter.com/tomruttle" className="social-button social-button--twitter footer__social-button" target="_blank" rel="me noopener noreferrer">Twitter: @tomruttle</a>
        <a href="https://github.com/tomruttle" className="social-button social-button--github footer__social-button" target="_blank" rel="me noopener noreferrer">Github: @tomruttle</a>
      </footer>
    );
  }
}
