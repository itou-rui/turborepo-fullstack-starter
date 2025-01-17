/* eslint @typescript-eslint/no-var-requires: off */

const path = require("path");
const { getAllEntryPoints, buildPackage } = require("./common");

function buildPackages(packageDir, target = "ES6") {
  const entryPoints = getAllEntryPoints(path.join(packageDir, "src"));

  buildPackage({
    entryPoints,
    outdir: path.join(packageDir, "dist"),
    target: target,
    platform: "node",
    tsconfig: path.join(packageDir, "tsconfig.json"),
    alias: {
      "@packages": path.resolve(__dirname, "../../packages"),
    },
  });
}

module.exports = { buildPackages };
