module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html?$': 'html-loader-jest',
  },
  setupFiles: ['jest-canvas-mock'],
};
