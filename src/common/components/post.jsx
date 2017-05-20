// @flow

/* eslint-disable react/no-danger */

import React from 'react';

import type { PostType } from '../types';

function createMarkup(html) {
  return { __html: html };
}

function Post({ words, metadata }: PostType) {
  return (
    <section className="pure-u-3-5">
      <div>
        <h3>{metadata.title}</h3>
        <aside>
          {metadata.date ? <span>posted {metadata.date}</span> : null}
        </aside>
      </div>
      <div dangerouslySetInnerHTML={createMarkup(words)} />
    </section>
  );
}

export default Post;
