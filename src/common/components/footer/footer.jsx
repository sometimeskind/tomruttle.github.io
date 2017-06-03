// @flow

import React, { PureComponent } from 'react';

import { PaddedFooter, GithubButton, TwitterButton } from './footer.styles';

export default class Footer extends PureComponent {
  render() {
    return (
      <PaddedFooter className="pure-u-1 pure-u-md-3-4 offset-md-1-4">
        <TwitterButton>Twitter: @tomruttle</TwitterButton>
        <GithubButton>Github: @tomruttle</GithubButton>
      </PaddedFooter>
    );
  }
}
