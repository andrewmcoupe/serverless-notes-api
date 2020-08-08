module.exports = {
  hooks: {
    'pre-commit': 'npm run tsc:repo && npx lint-staged',
    'post-merge': 'npm i',
  },
}
