module.exports = {
  hooks: {
    'pre-commit': 'npm run prettier:fix',
    'post-merge': 'npm i',
  },
}
