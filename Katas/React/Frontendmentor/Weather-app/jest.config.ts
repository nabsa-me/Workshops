import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass|module\\.css)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTest.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/main.tsx', '!src/index.tsx'],
  coverageDirectory: '<rootDir>/test/coverage',
  coverageReporters: [
    'text' // muestra en consola
    // 'lcov', // genera reporte para VSCode / navegadores
    // 'html' // crea una página HTML navegable
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}

export default config
