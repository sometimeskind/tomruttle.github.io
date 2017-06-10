// @flow

import React from 'react';

import type { SiteRoutes } from '../../types';

import { Sidebar, Header, List, ListLink, ListItemSidebar, activeClassName } from './sidebar.styles';

export default function WordsMenu({ routes }: { routes: SiteRoutes }) {
  const postRoutes = routes.filter((route) => route.get('title'));

  return (
    <Sidebar>
      <Header>
        <hr className="pure-u-1-2" />
        <h4>Posts List</h4>
      </Header>

      <nav>
        <List>
          {postRoutes.map((route) => (
            <ListItemSidebar key={`words-menu-${route.get('path')}`}>
              <ListLink activeClassName={activeClassName} to={route.get('path')}>{route.get('title')}</ListLink>
            </ListItemSidebar>
          ))}
        </List>
      </nav>
    </Sidebar>
  );
}
