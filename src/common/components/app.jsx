// @flow

import pureStyles from 'purecss/build/pure.css';
import pureGrids from 'purecss/build/grids-responsive.css';

import React, { Component } from 'react';
import { fromJS } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import pureOffsets from '../../../assets/css/offsets.css';

import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';

import type { Post } from '../types';

import styles from './app.module.css';

class App extends Component {
  props: {
    posts: Array<Post>,
  }

  state = {
    posts: fromJS(this.props.posts),
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        <Main posts={this.state.posts} />
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles, pureStyles, pureGrids, pureOffsets)(App);
