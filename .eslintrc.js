module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': [2, {"props": false}],
    'max-len': ["error", { "code": 200 }],
    'class-methods-use-this': 0,
    'no-new': 0,
    'prefer-destructuring': 0,
    'no-bitwise': 0,
    'no-mixed-operators': 0,
    'no-undef': 0,
    'no-underscore-dangle': 0,
  },
};
