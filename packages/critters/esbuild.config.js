/* eslint @typescript-eslint/no-var-requires: off */

const path = require('path');
const { buildPackages } = require('@packages/esbuild');

buildPackages(path.resolve(__dirname));
