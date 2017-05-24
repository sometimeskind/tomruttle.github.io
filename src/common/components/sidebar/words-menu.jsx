// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import type { PostType } from '../../types';

import './sidebar.css';

function WordsMenu({ posts }: { posts: Array<PostType> }) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <hr className="pure-u-1-2" />
        <h4>Posts List</h4>
      </div>

      <nav className="menu sidebar__menu">
        <ul>
          {posts.map(({ metadata }) => (
            <li key={metadata.path}>
              <NavLink className="menu__link sidebar__menu__link" activeClassName="menu__link--selected" to={`/words/${metadata.path}/`}>{metadata.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default WordsMenu;
