// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageReporters: ["text", "lcov", "html"], //
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Adjust this pattern to match your project's file extensions
    "!src/index.ts", // Example of excluding a specific file
    "!src/**/*.test.{js,jsx,ts,tsx}", // Exclude test files
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/pages/", // Exclude node_modules
    // Add other directories or files to exclude, if necessary
  ],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
