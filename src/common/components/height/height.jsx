// @flow

import React, { Component } from 'react';
import { ReactHeight } from 'react-height';

import type { Element } from 'react';

import styles from './height.module.css';

class App extends Component {
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
      <div className={styles.height} style={this.state.height ? { height: this.state.height } : {}}>
        <ReactHeight onHeightReady={this.setHeight}>
          {this.props.children}
        </ReactHeight>
      </div>
    );
  }
}

export default App;
