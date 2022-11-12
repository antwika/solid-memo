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
    'hooks/**/*{.ts,.tsx}',
    'lib/**/*{.ts,.tsx}',
    'pages/**/*{.ts,.tsx}',
    'ui/**/*{.ts,.tsx}',
    // 'src/**/*{.ts,.tsx}',
    // '!src/pages/_app.tsx',
  ],
  coverageThreshold: {
    './app': { branches: 0, functions: 0, lines: 0, statements: 0 },
    './components': { branches: 0, functions: 0, lines: 0, statements: 0 },
    './hooks': { branches: 0, functions: 0, lines: 0, statements: 0 },
    './lib': { branches: 0, functions: 0, lines: 0, statements: 0 },
    './pages': { branches: 0, functions: 0, lines: 0, statements: 0 },
    './ui': { branches: 0, functions: 0, lines: 0, statements: 0 },
  },
};

module.exports = createJestConfig(customJestConfig);
