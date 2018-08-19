// @flow

import type { Node } from 'react';

type FileName = string;
type FileTitle = string;
type Words = string;

export type Metadata = {|
  fileName: FileName,
  date: string,
  title: FileTitle,
  path: string,
|};

export type Post = {|
  metadata: Metadata,
  words: Words,
|}

export type ImportPost = {|
  fileName: FileName,
  words: Words,
|};

export type AppProps = {|
  posts: Array<Post>,
  buildHash: string,
|};

export type Posts = Array<{ [key: string]: (Metadata | Words) }>;

export type SetPageTitle = (title: string) => void;

export type SiteRoute = {|
  key: string,
  render: () => Node,
  exact: boolean,
  path?: string,
  title?: string,
  routes?: Array<SiteRoute>,
  sidebarHeader?: string,
|};

export type SiteRoutes = Array<SiteRoute>;

export type CurrentRoute = {|
  key: string,
  index: number,
  pathname: string,
  parent: ?CurrentRoute,
|};
