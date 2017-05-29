// @flow

export type FileName = string;
export type FileTitle = string;
export type Words = string;

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
