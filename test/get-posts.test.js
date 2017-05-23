import { parseMetadata } from '../src/server/get-posts';

describe('parseMetadata', () => {
  const words = 'These are test words.';
  const fileName = '/path/to/test.md';
  const title = 'A Post';
  const date = '2017-05-14';

  test('extracts metadata from a string', () => {
    const parsed = parseMetadata({
      fileName,
      words: `
<!--
date: ${date}
title: ${title}
-->
${words}
      `,
    });

    const expected = {
      words,
      metadata: {
        fileName,
        date: new Date(date).toUTCString(),
        title,
        path: 'test',
      },
    };

    expect(parsed).toMatchObject(expected);
  });

  test('gives default metadata when none is provided', () => {
    const parsed = parseMetadata({
      fileName,
      words,
    });

    const expected = {
      words,
      metadata: {
        fileName,
        date: new Date('0').toUTCString(),
        title: 'test',
        path: 'test',
      },
    };

    expect(parsed).toMatchObject(expected);
  });
});
