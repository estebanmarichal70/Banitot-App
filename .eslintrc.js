module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Best Practices
    'eqeqeq': 'error',
    'no-invalid-this': 'error',
    'no-return-assign': 'error',
    'no-unused-expressions': ['error', { 'allowTernary': true }],
    'no-useless-concat': 'error',
    'no-useless-return': 'error',

    // Variable
    'init-declarations': 'error',
    'no-use-before-define': 'error',

    // ES6
    'arrow-spacing': 'error',
    'no-confusing-arrow': 'error',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',

    // Vue
    "vue/html-quotes": ["error", "double"]
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
