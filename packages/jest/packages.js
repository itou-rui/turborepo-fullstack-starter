const commonConfig = require("./common");

module.exports = {
  ...commonConfig,
  moduleNameMapper: {
    "^@packages/(.*)$": "<rootDir>/../$1/src",
  },
};
