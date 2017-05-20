// @flow

import React from 'react';

function Home() {
  return (
    <div>
      <h4>Home</h4>
      <p>When this site was a blog I never wrote anything on it, so now it&apos;s just somewhere I&apos;m going to play with fun technology. I&apos;m also building it from scratch rather than using a UI framework, which is why it looks a little bare.</p>
      <p>So far this two-page, static SPA uses:</p>
      <ul>
        <li>Isomorphic React/React-Router</li>
        <li>Flow typing</li>
        <li>Webpack with this really excellent webpack module called <a href="https://github.com/markdalgleish/static-site-generator-webpack-plugin" rel="noopener noreferrer" target="_blank">static-site-generator</a> that allows me to serve this all statically/statelessly from Github Pages for free</li>
        <li>Automatic loading/reading/parsing/inserting of Markdown files as posts</li>
        <li>Travis CI, which rebuilds the static assets on git push</li>
        <li>Cloudflare, which does exciting CDN/TLS/DNSSEC/Caching things</li>
        <li>Others...</li>
      </ul>
      <p>Anyway, the source is <a href="https://github.com/tomruttle/www.tomruttle.com" rel="noopener noreferrer" target="_blank">here</a> if you want to check it out.</p>
    </div>
  );
}

export default Home;
