const tracker = {
  filename: "versions.json",
  updater: require("./scripts/versions-updater"),
};

module.exports = {
  bumpFiles: [tracker],
  packageFiles: [tracker],
};
