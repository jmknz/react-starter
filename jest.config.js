module.exports = {
  automock: false,
  // resolver: 'browser-resolve',
  // browser: true,
  bail: false,
  testMatch: [
    '**/src/__tests__/**/*.[jt]s?(x)',
    '**/src/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: true,
  setupFilesAfterEnv: ['./rtl.setup.js'],
};
