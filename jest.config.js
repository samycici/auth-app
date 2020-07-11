module.exports = {

  testPathIgnorePatterns: ['/utils/'],
  testEnvironment: 'node',
  testTimeout: 8000,
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  reporters: ['default', 'jest-junit'],
  testResultsProcessor: 'jest-junit',
  testMatch: [
    '**/__tests__/**/*.spec.js'
  ]
}
