const commonConfig = require("./common");

module.exports = {
  ...commonConfig,
  moduleNameMapper: {
    "^@packages/(.*)$": "<rootDir>/../../packages/$1/src",
  },
};
