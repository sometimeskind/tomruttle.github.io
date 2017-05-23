// @flow

import yaml from 'js-yaml';
import path from 'path';

import { MARKDOWN_EXTENSION } from './constants';

import type { ImportPostType, MetadataType, PostType } from '../common/types';

const OPEN_METADATA = '<!--';
const CLOSE_METADATA = '-->';

export function parseMetadata({ fileName, words: raw }: ImportPostType): PostType {
  let parsedMetadata: MetadataType | {} = {};
  let words = raw.trim();

  if (words.startsWith(OPEN_METADATA)) {
    const metaString = words.substring(OPEN_METADATA.length, words.indexOf(CLOSE_METADATA));

    try {
      parsedMetadata = yaml.safeLoad(metaString);
      words = words.substr(metaString.length + OPEN_METADATA.length + CLOSE_METADATA.length).trim();
    } catch (err) {
      // throw the error away.
    }
  }

  const fileTitle = path.basename(fileName, MARKDOWN_EXTENSION);

  const defaultMetadata = {
    fileName,
    date: '0',
    title: fileTitle,
    path: encodeURIComponent(fileTitle.toLowerCase()),
  };

  const metadata: MetadataType = { ...defaultMetadata, ...parsedMetadata };

  return { words, metadata: { ...metadata, date: new Date(metadata.date).toUTCString() } };
}

export default (posts: Array<ImportPostType>) => posts
  .filter(({ fileName }) => typeof fileName === 'string')
  .map((post) => parseMetadata(post))
  .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
