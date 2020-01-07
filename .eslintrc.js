module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'linebreak-style': 0,
    'prettier/prettier': 'error',
    'react/jsx-indent': ["error", 2],
    'react/jsx-indent-props': ["error", 2],
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 0,
    'allowForLoopAfterthoughts': 0,
  },
};
