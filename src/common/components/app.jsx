// @flow

import React from 'react';
import { Route, NavLink, Link, Switch } from 'react-router-dom';

import Home from './home';
import Words from './words';
import WordsMenu from './words-menu';

import type { PostType } from '../types';

function App({ posts }: { posts: Array<PostType> }) {
  return (
    <div className="pure-g container">
      <header className="pure-u-1">
        <div className="header-content pure-u-1 offset-md-2-5 pure-u-md-3-5">
          <div className="header-container">
            <h2><Link to="/">HELLO</Link></h2>
          </div>

          <nav>
            <ul className="pure-menu pure-menu-horizontal">
              <li className="pure-menu-item"><NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to="/" exact>Home</NavLink></li>
              <li className="pure-menu-item"><NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to="/words">Words</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="main pure-u-1">
        <section className="content pure-u-1 pure-u-md-3-5">
          <Route exact path="/" component={Home} />
          <Route path="/words/:path?" render={() => <Words posts={posts} />} />
        </section>

        <aside>
          <Switch>
            <Route
              path="/words/:path?"
              render={() => (
                <div className="sidenav pure-u-1 pure-u-md-2-5">
                  <WordsMenu posts={posts} />
                </div>
              )}
            />
            <Route render={() => <div className="sidenav no-content pure-u-1 pure-u-md-2-5" />} />
          </Switch>
        </aside>
      </div>

      <footer className="pure-u-1 offset-md-2-5 pure-u-md-3-5">
        <div className="footer-content">
          <a href="https://twitter.com/tomruttle" className="twitter-follow-button" data-show-count="false">Follow @tomruttle</a>
          &nbsp;
          <a href="https://github.com/tomruttle" className="github-button" aria-label="Follow @tomruttle on GitHub">Follow @tomruttle</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
