// @flow

import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

import Home from './home';
import Words from './words';
import About from './about';

function App() {
  return (
    <div className="pure-g">
      <header className="pure-u-1">
        <h2><Link to="/">HELLO</Link></h2>

        <nav className="pure-menu pure-menu-horizontal pure-u-1">
          <ul>
            <li className="pure-menu-item pure-u-1-3"><NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to="/" exact>Home</NavLink></li>
            <li className="pure-menu-item pure-u-1-3"><NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to="/words" exact>Words</NavLink></li>
            <li className="pure-menu-item pure-u-1-3"><NavLink className="pure-menu-link" activeClassName="pure-menu-selected" to="/about">About</NavLink></li>
          </ul>

          <hr />
        </nav>
      </header>

      <div className="pure-u-1">
        <Route exact path="/" component={Home} />
        <Route path="/words/:path?" component={Words} />
        <Route path="/about" component={About} />
      </div>
    </div>
  );
}

export default App;
