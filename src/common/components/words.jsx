// @flow

import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import postsObject from '../get-posts';

import Post from './post';

function Words() {
  return (
    <section className="pure-u-1">
      <h4 className="pure-u-1">Words</h4>
      <nav className="custom-restricted-width pure-u-1-5">
        <ul className="pure-menu-list">
          {postsObject.map(({ metadata }) => (
            <li className="pure-menu-item" key={metadata.path}>
              <NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to={`/words/${metadata.path}`}>{metadata.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Switch>
        {postsObject.map(({ metadata, words }) => (
          <Route
            key={metadata.fileName}
            path={`/words/${metadata.path}`}
            render={() => <Post metadata={metadata} words={words} />}
          />
        ))}
      </Switch>
    </section>
  );
}

export default Words;
