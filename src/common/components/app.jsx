// @flow

import React, { Component } from 'react';

import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';

import getRoutes from '../routes';

import type { Post, SetPageTitle, SiteRoutes } from '../types';
import {
  Wrapper,
  Outer,
  Inner,
  baseStyles,
} from './app.styles';

type Props = {
  posts: Array<Post>,
  setPageTitle: SetPageTitle,
};

type State = {
  routes: SiteRoutes,
};

export default class App extends Component<Props, State> {
  routes: SiteRoutes;

  constructor(props: Props) {
    super(props);

    this.routes = getRoutes(props.posts, props.setPageTitle);
  }

  render() {
    baseStyles();

    return (
      <Wrapper className="pure-g">
        <Outer>
          <Inner>
            <Header routes={this.routes} />
            <Main routes={this.routes} />
          </Inner>
          <Footer />
        </Outer>
      </Wrapper>
    );
  }
}
