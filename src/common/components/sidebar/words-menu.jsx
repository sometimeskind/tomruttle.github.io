// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import type { List, Record } from 'immutable';

import type { PostType } from '../../types';

import styles from './sidebar.module.css';

function WordsMenu({ posts }: { posts: List<Record<PostType>> }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <hr className={styles.divider} />
        <h4>Posts List</h4>
      </div>

      <nav>
        <ul className={styles.list}>
          {posts.toJS().map(({ metadata }) => (
            <li key={metadata.path} className={styles['list-item']}>
              <NavLink className={styles['list-link']} activeClassName={styles['list-link-selected']} to={`/words/${metadata.path}/`}>{metadata.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default withStyles(styles)(WordsMenu);
