const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'parserOptions': {
    'sourceType': 'module'
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-console': isProduction ? ['error', { allow: ['info', 'warn', 'error'] }] : ['off'],
    'no-debugger': isProduction ? ['error'] : ['off']
  }
}
