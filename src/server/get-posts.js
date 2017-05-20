// @flow

import yaml from 'js-yaml';
import pathParse from 'path-parse';

import type { ImportPostType, MetadataType, FileTitleType } from '../common/types';

const OPEN_METADATA = '<!--';
const CLOSE_METADATA = '-->';

export function parseMetadata({ fileName, words: raw }: ImportPostType) {
  let parsedMetadata: MetadataType | {} = {};
  let words = raw;

  if (raw.startsWith(OPEN_METADATA)) {
    const metaString = raw.substring(OPEN_METADATA.length, raw.indexOf(CLOSE_METADATA));

    try {
      parsedMetadata = yaml.safeLoad(metaString);
      words = raw.substr(metaString.length + OPEN_METADATA.length + CLOSE_METADATA.length);
    } catch (err) {
      // throw the error away.
    }
  }

  const { name: fileTitle }: { name: FileTitleType } = pathParse(fileName);

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
  .map((post) => parseMetadata(post))
  .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
