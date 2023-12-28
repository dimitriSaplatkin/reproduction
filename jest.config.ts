import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules"],
  testTimeout: 30000,
  testMatch: ["<rootDir>/**/*.test.ts"],
};
export default config;
