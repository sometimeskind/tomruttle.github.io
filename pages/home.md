When this site was a blog I never wrote anything on it, so now it's just somewhere I'm going to play with fun technology. To that end, in order to render its less-than-ten views, this website so far uses:

  - Isomorphic React/React-Router
  - Webpack
    - In particular a really excellent plugin called <a href="https://github.com/markdalgleish/static-site-generator-webpack-plugin" rel="noopener noreferrer" target="\_blank">static-site-generator</a> which allows me to serve this site statically/statelessly/free from Github Pages.
  - CSS Modules, PreCSS, PostCSS
  - Automatic loading/reading/parsing/inserting of Markdown files as posts
  - Flow, Eslint, Stylelint, Jest, Istanbul, Codacy for code quality
  - Build pipeline via hosted Travis CI
  - Yarn
  - Immutable.js
  - Exciting CDN/TLS/DNSSEC/Caching things from Cloudflare
  - Offline/Progressive Web App technology (a Service worker and an App Manifest)
  - Other

The source is <a href="https://github.com/tomruttle/www.tomruttle.com" rel="me noopener noreferrer" target="\_blank">here</a> if you want to check it out.
