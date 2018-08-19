// @flow

import yaml from 'js-yaml';
import path from 'path';

import { MARKDOWN_EXTENSION } from './constants';

import type { ImportPost, Metadata, Post } from '../common/types';

const OPEN_METADATA = '<!--';
const CLOSE_METADATA = '-->';

export function parseMetadata({ fileName, words: raw }: ImportPost): Post {
  let parsedMetadata: ?Metadata;
  let words = raw.trim();

  if (words.startsWith(OPEN_METADATA)) {
    const metaString = words.substring(OPEN_METADATA.length, words.indexOf(CLOSE_METADATA));

    try {
      const loadedYaml = yaml.safeLoad(metaString);

      if (typeof loadedYaml !== 'object' || loadedYaml === null) {
        throw new Error('Invalid yaml loaded.');
      }

      // $FlowFixMe
      parsedMetadata = ((loadedYaml: any): Metadata);

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

  const metadata: Metadata = { ...defaultMetadata, ...(parsedMetadata || {}) };

  return {
    words,
    metadata: {
      ...metadata,
      date: new Date(metadata.date).toUTCString(),
    },
  };
}

export default function getPosts(posts: Array<{ words: string, fileName?: string }>): Array<Post> {
  // $FlowFixMe https://github.com/facebook/flow/issues/1414
  const filtered = ((posts.filter((post) => typeof post.fileName === 'string'): Array<any>): Array<ImportPost>);

  return filtered
    .map((post) => parseMetadata(post))
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}
