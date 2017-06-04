// @flow

import React, { Component } from 'react';
import { ReactHeight } from 'react-height';

import type { Element } from 'react';

export default class Height extends Component {
  props: {
    children: Element<*>,
  }

  constructor(...args: Array<Object>) {
    super(...args);
    (this: any).setHeight = this.setHeight.bind(this);
  }

  state: { height: number } = {
    height: 0,
  }

  setHeight(height: number) {
    this.setState(() => ({ height }));
  }

  render() {
    return (
      <div className="pure-u-1" style={this.state.height ? { height: this.state.height } : {}}>
        <ReactHeight onHeightReady={this.setHeight}>
          {this.props.children}
        </ReactHeight>
      </div>
    );
  }
}
