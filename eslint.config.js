import antfu from '@antfu/eslint-config'

export default antfu({}, {
  rules: {
    // allow console and debugger
    'no-console': 'off',
    'no-debugger': 'off',
    // ignore top-level functions should be declared with function keywordes
    'antfu/top-level-function': 'off',
  },
})
