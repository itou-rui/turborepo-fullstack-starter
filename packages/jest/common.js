module.exports = {
  transform: {
    globals: ["ts-jest"],
    ".ts": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/*.test.ts"],
  verbose: true,
};
