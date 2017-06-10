// @flow

import React, { Component } from 'react';
import { fromJS } from 'immutable';

import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';

import type { Post, Posts, SetPageTitle } from '../types';
import { Wrapper, Outer, Inner, baseStyles } from './app.styles';

export default class App extends Component {
  props: {
    posts: Array<Post>,
    setPageTitle: SetPageTitle,
  }

  state: { posts: Posts } = {
    posts: fromJS(this.props.posts),
  }

  render() {
    baseStyles();

    return (
      <Wrapper className="pure-g">
        <Outer>
          <Inner>
            <Header />
            <Main posts={this.state.posts} setPageTitle={this.props.setPageTitle} />
          </Inner>
          <Footer />
        </Outer>
      </Wrapper>
    );
  }
}
