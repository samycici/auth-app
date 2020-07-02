/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutator: "javascript",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  transpilers: [],
  coverageAnalysis: "off",
  dashboard: {
    project: 'github.com/samycici/auth-app'
  },
  mutate: [
    'server/**/*.js'
  ],
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js',
    enableFindRelatedTests: false
  },
  timeoutMS: 15000,
  tempDirName: 'stryker-tmp'
};
