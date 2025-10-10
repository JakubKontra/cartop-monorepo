module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.interface.ts',
    '!**/*.dto.ts',
    '!**/*.input.ts',
    '!**/*.entity.ts',
    '!**/*.enum.ts',
    '!**/main.ts',
    '!**/*.module.ts',
  ],
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  testTimeout: 10000,
};
