When this site was a blog I never wrote anything on it, so now it's just somewhere I'm going to play with fun technology.

To render its less-than-ten views, this stateless SPA so far uses:

  - Isomorphic React/React-Router
  - Webpack, in particular a really excellent plugin called <a href="https://github.com/markdalgleish/static-site-generator-webpack-plugin" rel="noopener noreferrer" target="_blank">static-site-generator</a> which allows me to serve this site statically/statelessly from Github Pages.
  - Automatic loading/reading/parsing/inserting of Markdown files as posts
  - Flow, Eslint, Stylelint, Jest, Istanbul, Codacy for code quality
  - Travis CI, which rebuilds the static assets on git push
  - Cloudflare, which does exciting CDN/TLS/DNSSEC/Caching things
  - Service worker and App Manifest
  - Other

The source is <a href="https://github.com/tomruttle/www.tomruttle.com" rel="me noopener noreferrer" target="_blank">here</a> if you want to check it out.
