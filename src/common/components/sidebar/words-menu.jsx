// @flow

import React from 'react';

import type { Posts } from '../../types';

import { Sidebar, Header, List, ListLink, ListItemSidebar, activeClassName } from './sidebar.styles';

export default function WordsMenu({ posts }: { posts: Posts }) {
  return (
    <Sidebar>
      <Header>
        <hr className="pure-u-1-2" />
        <h4>Posts List</h4>
      </Header>

      <nav>
        <List>
          {posts.map((post) => (
            <ListItemSidebar key={post.getIn(['metadata', 'path'])}>
              <ListLink activeClassName={activeClassName} to={`/words/${String(post.getIn(['metadata', 'path']))}/`}>{post.getIn(['metadata', 'title'])}</ListLink>
            </ListItemSidebar>
          ))}
        </List>
      </nav>
    </Sidebar>
  );
}
