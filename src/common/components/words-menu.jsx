// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import type { PostType } from '../types';

function WordsMenu({ posts }: { posts: Array<PostType> }) {
  return (
    <nav className="custom-restricted-width">
      <div className="sidenav-header">
        <hr className="pure-u-1-2" />
        <h4>Posts List</h4>
      </div>
      <ul className="pure-menu-list">
        {posts.map(({ metadata }) => (
          <li className="pure-menu-item" key={metadata.path}>
            <NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to={`/words/${metadata.path}/`}>{metadata.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default WordsMenu;
