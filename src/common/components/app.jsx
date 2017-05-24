// @flow

import React, { Component } from 'react';
import { ReactHeight } from 'react-height';

import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';

import type { PostType } from '../types';

import './app.css';

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
      <div className="pure-g app">
        <Header />
        <div className="pure-u-1" style={this.state.height ? { height: this.state.height } : {}}>
          <ReactHeight onHeightReady={this.setHeight}>
            <Main posts={this.props.posts} />
          </ReactHeight>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
