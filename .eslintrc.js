module.exports = {
  env: {
    browser: true,
    es6: true
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    jQuery: true,
    $: true
  },
  extends: 'standard',
  plugins: [],
  // 个别自己的规则
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'semi': 1,
    'no-trailing-spaces': 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
