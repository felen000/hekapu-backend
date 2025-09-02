/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
};