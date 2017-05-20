// @flow

export type FileNameType = string;
export type FileTitleType = string;
export type WordsType = string;

export type MetadataType = {
  fileName: FileNameType,
  date: string,
  title: FileTitleType,
  path: string,
};

export type PostType = {
  metadata: MetadataType,
  words: WordsType,
}

export type ImportPostType = { fileName: FileNameType, words: WordsType };

export type AppPropsType = {
  posts: Array<PostType>,
};
