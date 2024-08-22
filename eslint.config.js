import antfu from '@antfu/eslint-config'

export default antfu(
  {
    markdown: {
      codeBlocks: {
        vue: false, // Disable Vue code block processing in Markdown
      },
    },
  },
  {
    rules: {
      // allow console and debugger
      'no-console': 'off',
      'no-debugger': 'off',
      // ignore top-level functions should be declared with function keywordes
      'antfu/top-level-function': 'off',
      'style/semi': ['error', 'never'],
    },
  },
)
