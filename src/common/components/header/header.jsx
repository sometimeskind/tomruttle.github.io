// @flow

import React from 'react';

import pure from 'purecss/build/pure.css';
import responsive from 'purecss/build/grids-responsive.css';

import { NavLink, Link } from 'react-router-dom';

import offset from '../../../../assets/css/offsets.css';

import styles from './header.css';

export default function Header() {
  return (
    <header className={`${styles.header} ${pure['pure-u-1']} ${offset['offset-md-1-4']} ${responsive['pure-u-md-3-4']}`}>
      <h2><Link className={styles['title-link']} to="/">HELLO</Link></h2>

      <nav>
        <ul className={styles.list}>
          <li className={styles['list-item']}><NavLink className={styles['list-link']} activeClassName={styles['list-link-selected']} to="/" exact>Home</NavLink></li>
          <li className={styles['list-item']}><NavLink className={styles['list-link']} activeClassName={styles['list-link-selected']} to="/words/">Words</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
