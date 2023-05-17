# Prepare for release

1. Merge all required branches into main branch.
   2.Increase version as required in below files: (Always increase minor version on every release except some hot-fixes or major changes).
   Example App. (example/pubspec.yaml)
   SDk Version. (pubspec.yaml)
2. Update CHANGELOG.md file.
3. Commit all into main branch and follow below steps to publish js package.

# Publish Package

- From root directory

  `yarn build:sdk`

- Make sure you've logged in to your npm account on your machine and then run.

  `npm publish `
