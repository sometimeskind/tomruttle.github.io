// @flow

import type { List, Map } from 'immutable';

type FileName = string;
type FileTitle = string;
type Words = string;

export type Metadata = {
  fileName: FileName,
  date: string,
  title: FileTitle,
  path: string,
};

export type Post = {
  metadata: Metadata,
  words: Words,
}

export type ImportPost = {
  fileName: FileName,
  words: Words,
};

export type AppProps = {
  posts: Array<Post>,
  buildHash: string,
};

export type Posts = List<Map<string, Metadata | Words>>;

export type SetPageTitle = (title: string) => void;
