module.exports = {
  "extends": [
    'airbnb',
    'plugin:flowtype/recommended',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'arrow-parens': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'react/sort-comp': 0,
    'react/prefer-stateless-function': 0,
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],

    // Annoying codacy bug
    'import/extensions': 0,
  }
}
