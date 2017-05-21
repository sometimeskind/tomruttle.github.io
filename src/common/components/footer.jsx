// @flow

import React, { PureComponent } from 'react';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="pure-u-1 offset-md-2-5 pure-u-md-3-5">
        <div className="footer-content">
          <a href="https://twitter.com/tomruttle" className="twitter-button">Twitter: @tomruttle</a>
          <a href="https://github.com/tomruttle" className="github-button">Github: @tomruttle</a>
        </div>
      </footer>
    );
  }
}
