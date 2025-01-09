import * as parser from '@babel/parser'

/**
 * Parses JavaScript/TypeScript code into an AST (Abstract Syntax Tree)
 * First attempts to parse with TypeScript and JSX support
 * Falls back to basic JavaScript parsing if TypeScript parsing fails
 */
export function parseScript(content: string) {
  try {
    return parser.parse(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    })
  }
  catch {
    return parser.parse(content, {
      sourceType: 'module',
    })
  }
}
