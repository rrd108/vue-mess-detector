import antfu from '@antfu/eslint-config'

export default antfu({}, {
  rules: {
    // allow console and debugger
    'no-console': 0,
    'no-debugger': 0,
  },
})
