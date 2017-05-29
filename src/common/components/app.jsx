// @flow

import pureStyles from 'purecss/build/pure.css';
import pureGrids from 'purecss/build/grids-responsive.css';

import React from 'react';
import { fromJS } from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import pureOffsets from '../../../assets/css/offsets.css';

import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';
import Height from './height/height';

import type { Post } from '../types';

import styles from './app.module.css';

function App({ posts }: { posts: Array<Post> }) {
  return (
    <div className={styles.app}>
      <Header />
      <Height children={<Main posts={fromJS(posts)} />} />
      <Footer />
    </div>
  );
}

export default withStyles(styles, pureStyles, pureGrids, pureOffsets)(App);
