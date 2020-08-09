module.exports = {
  hooks: {
    'pre-commit': 'npm run prettier:fix && npm run tsc:repo',
    'post-merge': 'npm i',
  },
}
