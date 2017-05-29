// @flow

/* eslint-disable react/no-danger */

import React, { PureComponent } from 'react';

function createMarkup(html) {
  return { __html: html };
}

class DangerousSection extends PureComponent {
  props: {
    content: string,
  }

  render() {
    return <section dangerouslySetInnerHTML={createMarkup(this.props.content)} />;
  }
}

export default DangerousSection;
