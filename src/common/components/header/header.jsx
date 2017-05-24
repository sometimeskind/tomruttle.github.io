// @flow

import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import './header.css';

export default function Header() {
  return (
    <header className="header pure-u-1 offset-md-1-4 pure-u-md-3-4">
      <h2><Link to="/">HELLO</Link></h2>

      <nav className="menu header__menu">
        <ul>
          <li><NavLink className="menu__link header__menu__link" activeClassName="menu__link--selected" to="/" exact>Home</NavLink></li>
          <li><NavLink className="menu__link header__menu__link" activeClassName="menu__link--selected" to="/words/">Words</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
