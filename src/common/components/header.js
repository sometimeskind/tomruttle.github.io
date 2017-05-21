// @flow

import React from 'react';

import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
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
  );
}
