module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaVersion: 2018,
  },
  rules: {
  },
};
