// @flow

import type { Location } from 'react-router';

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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

export default class App extends Component<Props> {
  routes: SiteRoutes;

  constructor(props: Props) {
    super(props);

    this.routes = getRoutes(props.posts, props.setPageTitle);
  }

  renderMain = (routeProps: { location: Location }) => {
    const { location } = routeProps;

    return (
      <Main location={location} routes={this.routes} />
    );
  }

  render() {
    baseStyles();

    return (
      <Wrapper className="pure-g">
        <Outer>
          <Inner>
            <Header routes={this.routes} />
            <Route render={this.renderMain} />
          </Inner>
          <Footer />
        </Outer>
      </Wrapper>
    );
  }
}
