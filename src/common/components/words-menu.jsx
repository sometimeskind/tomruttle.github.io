// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import type { PostType } from '../types';

function WordsMenu({ posts }: { posts: Array<PostType> }) {
  return (
    <nav className="custom-restricted-width">
      <ul className="pure-menu-list">
        {posts.map(({ metadata }) => (
          <li className="pure-menu-item" key={metadata.path}>
            <NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to={`/words/${metadata.path}`}>{metadata.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default WordsMenu;
