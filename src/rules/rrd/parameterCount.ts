import type { NodePath } from '@babel/traverse'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import { getFunctionParams } from '../../helpers/getFunctionParams'
import { parseScript } from '../../helpers/parseScript'

const results: FileCheckResult[] = []

function checkParameters(name: string, params: t.Identifier[], filePath: string, startLine: number, maxParameterCount: number) {
  if (params.length > maxParameterCount) {
    results.push({
      filePath,
      message: `function <bg_warn>${name}#${startLine}</bg_warn> has <bg_warn>${params.length}</bg_warn> parameters`,
    })
  }
}

const resetResults = () => (results.length = 0)

const checkParameterCount = (script: SFCScriptBlock | null, filePath: string, maxParameterCount: number) => {
  if (!script) {
    return
  }

  // Clean up script content
  const content = script.content.trim().replace(/<script\b[^>]*>|<\/script>/gi, '')
  const ast = parseScript(content)

  // Walk through the AST and check each type of function
  traverse(ast, {
    // Regular functions: function myFunc(a, b, c) { ... }
    FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
      const info = getFunctionParams(path)
      if (info) {
        checkParameters(info.name, info.params, filePath, info.startLine, maxParameterCount)
      }
    },

    // Arrow functions: const myFunc = (a, b, c) => { ... }
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
      if (t.isVariableDeclarator(path.parent)) {
        const info = getFunctionParams(path)
        if (info) {
          checkParameters(info.name, info.params, filePath, info.startLine, maxParameterCount)
        }
      }
    },

    // Function expressions: const myFunc = function(a, b, c) { ... }
    FunctionExpression(path: NodePath<t.FunctionExpression>) {
      const parentName = t.isVariableDeclarator(path.parent) && t.isIdentifier(path.parent.id)
        ? path.parent.id.name
        : undefined

      const info = getFunctionParams(path, parentName)
      if (info) {
        checkParameters(info.name, info.params, filePath, info.startLine, maxParameterCount)
      }
    },
  })
}

const reportParameterCount = (maxParameterCount: number) => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ parameter count</text_info>`,
        description: `👉 <text_warn>Max number of function parameters should be ${maxParameterCount}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()
  return offenses
}

export { checkParameterCount, reportParameterCount }
