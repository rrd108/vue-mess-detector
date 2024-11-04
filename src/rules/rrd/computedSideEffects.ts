import type { NodePath } from '@babel/traverse'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import { hasSideEffects } from '../../helpers/hasSideEffects'
import { parseScript } from '../../helpers/parseScript'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkComputedSideEffects = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = script.content.trim().replace(/<script\b[^>]*>|<\/script>/gi, '')
  const ast = parseScript(content)

  traverse(ast, {
    CallExpression(path: NodePath<t.CallExpression>) {
      // Check if this is a computed() call
      if (t.isIdentifier(path.node.callee) && path.node.callee.name === 'computed') {
        const [arg] = path.node.arguments

        // Check if the argument is an arrow function
        if (t.isArrowFunctionExpression(arg)) {
          const functionBody = t.isBlockStatement(arg.body) ? arg.body : t.blockStatement([t.returnStatement(arg.body)])

          if (hasSideEffects(functionBody)) {
            const loc = path.node.loc
            if (loc) {
              const lineNumber = loc.start.line
              // Get the computed function's code for the message
              const computedCode = script.content.slice(path.node.start!, path.node.end!)
              const truncatedCode = computedCode.length > 20 ? `${computedCode.slice(0, 20)}...` : computedCode

              results.push({
                filePath,
                message: `line #${lineNumber} side effect detected in computed property <bg_err>(${truncatedCode.trim()})</bg_err>`,
              })
            }
          }
        }
      }
    },
  })
}

const reportComputedSideEffects = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ computed side effects</text_info>`,
        description: `👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkComputedSideEffects, reportComputedSideEffects }
