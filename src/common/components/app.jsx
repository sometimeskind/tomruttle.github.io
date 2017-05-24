// @flow

import React, { Component } from 'react';
import { fromJS } from 'immutable';

import pure from 'purecss/build/pure.css';

import type { List, Record } from 'immutable';

import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';
import Height from './height/height';

import type { PostType } from '../types';

import styles from './app.css';

class App extends Component {
  props: { posts: Array<PostType> }

  state: { posts: List<Record<PostType>>} = {
    posts: fromJS(this.props.posts),
  }

  render() {
    return (
      <div className={`${pure['pure-g']} ${styles.app}`}>
        <Header />
        <Height className={pure['pure-u-1']} children={<Main posts={this.state.posts} />} />
        <Footer />
      </div>
    );
  }
}

export default App;
