// @flow

import React, { Component } from 'react';

import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';

import getRoutes from '../routes';

import type { Post, SetPageTitle, SiteRoutes } from '../types';
import { Wrapper, Outer, Inner, baseStyles } from './app.styles';

export default class App extends Component {
  props: {
    posts: Array<Post>,
    setPageTitle: SetPageTitle,
  }

  state: { routes: SiteRoutes } = {
    routes: getRoutes({
      posts: this.props.posts,
      setPageTitle: this.props.setPageTitle,
    }),
  }

  render() {
    baseStyles();

    return (
      <Wrapper className="pure-g">
        <Outer>
          <Inner>
            <Header routes={this.state.routes} />
            <Main routes={this.state.routes} />
          </Inner>
          <Footer />
        </Outer>
      </Wrapper>
    );
  }
}
