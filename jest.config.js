module.exports = {

  testPathIgnorePatterns: ['/utils/'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  reporters: ['default', 'jest-junit'],
  testMatch: [
    '**/__tests__/**/*.spec.js'
  ]
}
