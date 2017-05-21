// @flow

import React, { Component } from 'react';
import { ReactHeight } from 'react-height';

import Header from './header';
import Main from './main';
import Footer from './footer';

import type { PostType } from '../types';

class App extends Component {
  props: { posts: Array<PostType> }

  constructor(...args: Array<Object>) {
    super(...args);
    (this: any).setHeight = this.setHeight.bind(this);
  }

  state = {
    height: 0,
  }

  setHeight(height: number) {
    this.setState(() => ({ height }));
  }

  render() {
    return (
      <div className="pure-g container">
        <Header />
        <div className="main pure-u-1" style={{ height: this.state.height }}>
          <ReactHeight className="clear-fix" onHeightReady={this.setHeight}>
            <Main posts={this.props.posts} />
          </ReactHeight>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
