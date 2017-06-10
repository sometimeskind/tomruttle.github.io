// @flow

import React from 'react';
import pathToRegexp from 'path-to-regexp';

import type { SiteRoutes } from '../../types';

import { PaddedHeader, TitleLink, HeaderList, HeaderListItem, HeaderListLink, activeClassName } from './header.styles';

export default function Header({ routes }: { routes: SiteRoutes }) {
  const links = routes.filter((route) => route.get('title'));

  return (
    <PaddedHeader className="pure-u-1 pure-u-md-3-4 offset-md-1-4">
      <h2><TitleLink to="/">HELLO</TitleLink></h2>

      <nav>
        <HeaderList>
          {links.map((link) => {
            const path = pathToRegexp.parse(link.get('path'))[0];

            return (
              <HeaderListItem key={`header-${link.get('key')}`}>
                <HeaderListLink
                  activeClassName={activeClassName}
                  to={`${path}${path.endsWith('/') ? '' : '/'}`}
                >{link.get('title')}</HeaderListLink>
              </HeaderListItem>
            );
          })}
        </HeaderList>
      </nav>
    </PaddedHeader>
  );
}
