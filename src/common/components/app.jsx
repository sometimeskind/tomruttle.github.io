// @flow

import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

import Home from './home';
import Words from './words';
import WordsMenu from './words-menu';

import type { PostType } from '../types';

function App({ posts }: { posts: Array<PostType> }) {
  return (
    <div className="pure-g container">
      <header className="pure-u-1">
        <div className="pure-u-2-5" />
        <div className="pure-u-3-5">
          <div className="header-container">
            <h2><Link to="/">HELLO</Link></h2>
          </div>

          <nav>
            <ul className="pure-menu pure-menu-horizontal">
              <li className="pure-menu-item pure-u-1-5"><NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to="/" exact>Home</NavLink></li>
              <li className="pure-menu-item pure-u-1-5"><NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to="/words">Words</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="main pure-u-1">
        <aside className="sidenav pure-u-1 pure-u-md-2-5">
          <Route path="/words/:path?" render={() => <WordsMenu posts={posts} />} />
        </aside>

        <section className="content pure-u-1 pure-u-md-3-5">
          <Route exact path="/" component={Home} />
          <Route path="/words/:path?" render={() => <Words posts={posts} />} />
        </section>
      </div>
    </div>
  );
}

export default App;
