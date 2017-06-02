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

import type { Post, Posts } from '../types';

import styles from './app.module.css';

class App extends Component {
  props: {
    posts: Array<Post>,
  }

  state: { posts: Posts } = {
    posts: fromJS(this.props.posts),
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <Header />
            <Main posts={this.state.posts} />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, pureStyles, pureGrids, pureOffsets)(App);
