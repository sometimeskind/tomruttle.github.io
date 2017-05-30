// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import type { Posts } from '../../types';

import styles from './sidebar.module.css';

function WordsMenu({ posts }: { posts: Posts }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <hr className={styles.divider} />
        <h4>Posts List</h4>
      </div>

      <nav>
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.getIn(['metadata', 'path'])} className={styles['list-item']}>
              <NavLink className={styles['list-link']} activeClassName={styles['list-link-selected']} to={`/words/${String(post.getIn(['metadata', 'path']))}/`}>{post.getIn(['metadata', 'title'])}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default withStyles(styles)(WordsMenu);
