const versionUpdater = {
  filename: "versions.json",
  updater: require("./scripts/versions-updater"),
};
const manifestUpdater = {
  filename: "manifest.json",
  updater: require("./scripts/manifest-updater"),
};

module.exports = {
  bumpFiles: [versionUpdater, manifestUpdater],
  packageFiles: [versionUpdater, manifestUpdater],
};
