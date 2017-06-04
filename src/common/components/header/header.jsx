// @flow

import React from 'react';

import { PaddedHeader, TitleLink, HeaderList, HeaderListItem, HeaderListLink, activeClassName } from './header.styles';

export default function Header() {
  return (
    <PaddedHeader className="pure-u-1 pure-u-md-3-4 offset-md-1-4">
      <h2><TitleLink to="/">HELLO</TitleLink></h2>

      <nav>
        <HeaderList>
          <HeaderListItem><HeaderListLink activeClassName={activeClassName} to="/" exact>Home</HeaderListLink></HeaderListItem>
          <HeaderListItem><HeaderListLink activeClassName={activeClassName} to="/words/">Words</HeaderListLink></HeaderListItem>
        </HeaderList>
      </nav>
    </PaddedHeader>
  );
}
