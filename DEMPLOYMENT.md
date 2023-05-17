# Prepare for release

1. Merge all required changes/branches to dev branch.
2. Increase version as required in below files: (Always increase

   - Example App. (example/demo-app/package.json)
   - SDk Version. (package.json)

3. Update CHANGELOG.md file.
4. Raise PR to main.
5. Merge PR to main and follow below steps to publish JS package.


# Publish Package(main branch)

- From root directory

  `yarn build:sdk`

- Make sure you've logged in to your npm account on your machine and then run.

  `npm publish `
