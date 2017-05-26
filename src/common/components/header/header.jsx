// @flow

import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
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
