// @flow

import type { List, Record } from 'immutable';

export type FileName = string;
export type FileTitle = string;
export type WordsType = string;

export type Metadata = {
  fileName: FileName,
  date: string,
  title: FileTitle,
  path: string,
};

export type Post = {
  metadata: Metadata,
  words: WordsType,
}

export type ImportPost = {
  fileName: FileName,
  words: WordsType,
};

export type AppProps = {
  posts: Array<Post>,
  buildHash: string,
};

export type Posts = List<Record<Post>>;
