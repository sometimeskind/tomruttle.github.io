// @flow

import React, { PureComponent } from 'react';

import { PaddedFooter, SocialButton } from './footer.styles';

export default class Footer extends PureComponent {
  render() {
    return (
      <PaddedFooter className="pure-u-1 pure-u-md-3-4 offset-md-1-4">
        <SocialButton twitter>Twitter: @tomruttle</SocialButton>
        <SocialButton github>Github: @tomruttle</SocialButton>
      </PaddedFooter>
    );
  }
}
