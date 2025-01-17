/* eslint @typescript-eslint/no-var-requires: off */

const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

function getAllEntryPoints(dir) {
  let entryPoints = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      entryPoints = entryPoints.concat(getAllEntryPoints(fullPath));
    } else if (path.extname(fullPath) === ".ts") {
      entryPoints.push(fullPath);
    }
  });

  return entryPoints;
}

function buildPackage({
  entryPoints,
  outdir,
  target,
  platform,
  tsconfig,
  alias,
}) {
  esbuild
    .build({
      entryPoints,
      bundle: true,
      platform: platform,
      target: target,
      outdir: outdir,
      tsconfig: tsconfig,
      external: [],
      alias: alias,
      loader: {
        ".ts": "ts",
      },
    })
    .catch(() => process.exit(1));
}

module.exports = { getAllEntryPoints, buildPackage };
