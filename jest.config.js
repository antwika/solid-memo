const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/ui/(.*)$': '<rootDir>/ui/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*{.ts,.tsx}',
    'components/**/*{.ts,.tsx}',
    'lib/**/*{.ts,.tsx}',
    'ui/**/*{.ts,.tsx}',
    'hooks/**/*{.ts,.tsx}',
    // 'src/**/*{.ts,.tsx}',
    // '!src/pages/_app.tsx',
  ],
  coverageThreshold: {
    './src': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
