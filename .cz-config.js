module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat: New feature or change to an existing one' },
    { value: '🐛 fix', name: '🐛 fix: Fixing a bug' },
    { value: '📝 docs', name: '📝 docs: Add, delete or update documentation and README' },
    { value: '💄 style', name: '💄 style: Styles or formatting changes' },
    { value: '♻️ refactor', name: '♻️ refactor: Clean or polish working pieces of code' },
    { value: '🔧 chore', name: '🔧 chore: Updating build tools and packages' },
    { value: '✅ test', name: '✅ test: Adding or modifiying tests' },
    { value: '⚡ perf', name: '⚡ perf: Performance improvements' },
    { value: '🛡️ security', name: '🛡️ security: Improve security facts as login, tokens, cifer, etc.' },
  ],
  scopes: ['katas', 'fem', 'tutorial', 'tests','ci'],
  allowCustomScopes: true,
  subjectLimit: 100
};