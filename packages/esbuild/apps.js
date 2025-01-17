/* eslint @typescript-eslint/no-var-requires: off */

const path = require("path");
const { getAllEntryPoints, buildPackage } = require("./common");

function buildApps(appDir, target = "esnext") {
  const entryPoints = getAllEntryPoints(path.join(appDir, "src"));

  buildPackage({
    entryPoints,
    outdir: path.join(appDir, "dist"),
    target: target,
    platform: "node",
    tsconfig: path.join(appDir, "tsconfig.json"),
    alias: {
      "@packages": path.resolve(__dirname, "../../packages"),
    },
  });
}

module.exports = { buildApps };
