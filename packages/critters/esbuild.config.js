/* eslint @typescript-eslint/no-var-requires: off */

const path = require('path');
const { buildPackages } = require('@workspace/esbuild');

buildPackages(path.resolve(__dirname));
