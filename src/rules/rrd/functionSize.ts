import type { NodePath } from '@babel/traverse'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'

// Parameters needed to track and report function size violations
interface AddFunctionToFilesParams {
  funcName: string // Name of the function being analyzed
  startLine: number // Starting line of the function in the file
  endLine: number // Ending line of the function in the file
  filePath: string // Path to the file being analyzed
  max: number // Maximum allowed lines for a function
}

const results: FileCheckResult[] = []

/**
 * Analyzes a function's size and adds violations to the results array
 * - If size > 2*max: Reports as error (red highlight)
 * - If max <= size <= 2*max: Reports as warning (yellow highlight)
 */
function addFunctionToFiles({ funcName, startLine, endLine, filePath, max }: AddFunctionToFilesParams) {
  const lineCount = endLine - startLine + 1

  if (lineCount > 2 * max) {
    results.push({
      filePath,
      message: `function <bg_err>(${funcName}#${startLine})</bg_err> is too long: <bg_err>${lineCount} lines</bg_err>`,
    })
    return
  }
  if (lineCount >= max) {
    results.push({
      filePath,
      message: `function <bg_warn>(${funcName}#${startLine})</bg_warn> is too long: <bg_warn>${lineCount} lines</bg_warn>`,
    })
  }
}

/**
 * Converts JavaScript/TypeScript code into an AST (Abstract Syntax Tree)
 * First attempts to parse with TypeScript and JSX support
 * Falls back to basic JavaScript parsing if TypeScript parsing fails
 */
function parseScript(content: string) {
  try {
    return parser.parse(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    })
  }
  catch {
    // Fallback to script parsing without TypeScript
    return parser.parse(content, {
      sourceType: 'module',
    })
  }
}

const resetResults = () => (results.length = 0)

/**
 * Main function to analyze function sizes in a Vue component's script block
 * Uses Babel to parse the code and traverse the AST to find all function definitions
 *
 * @param script - The script block from a Vue component
 * @param filePath - Path to the file being analyzed
 * @param max - Maximum allowed function size in lines
 */
const checkFunctionSize = (script: SFCScriptBlock | null, filePath: string, max: number) => {
  if (!script) {
    return
  }

  // Clean up script content by removing script tags
  const content = script.content.trim().replace(/<script\b[^>]*>|<\/script>/gi, '')
  // Parse the code into an AST for analysis
  const ast = parseScript(content)

  // Walk through the AST and check each type of function definition
  traverse(ast, {
    // Handles regular function declarations: function myFunc() { ... }
    FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
      const name = path.node.id?.name || 'anonymous'
      const startLine = path.node.loc?.start.line || 0
      const endLine = path.node.loc?.end.line || 0

      addFunctionToFiles({
        funcName: name,
        startLine,
        endLine,
        filePath,
        max,
      })
    },

    // Handles arrow functions: const myFunc = () => { ... }
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
      // Only check named arrow functions (those assigned to variables)
      if (t.isVariableDeclarator(path.parent)) {
        const name = t.isIdentifier(path.parent.id) ? path.parent.id.name : 'anonymous'
        const startLine = path.node.loc?.start.line || 0
        const endLine = path.node.loc?.end.line || 0

        addFunctionToFiles({
          funcName: name,
          startLine,
          endLine,
          filePath,
          max,
        })
      }
    },

    // Handles function expressions: const myFunc = function() { ... }
    FunctionExpression(path: NodePath<t.FunctionExpression>) {
      let name = 'anonymous'
      if (t.isVariableDeclarator(path.parent) && t.isIdentifier(path.parent.id)) {
        name = path.parent.id.name
      }

      const startLine = path.node.loc?.start.line || 0
      const endLine = path.node.loc?.end.line || 0

      addFunctionToFiles({
        funcName: name,
        startLine,
        endLine,
        filePath,
        max,
      })
    },
  })
}

const reportFunctionSize = (max: number) => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ function size</text_info>`,
        description: `👉 <text_warn>Functions must be shorter than ${max} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkFunctionSize, reportFunctionSize }
