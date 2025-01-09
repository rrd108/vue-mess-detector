import type { NodePath } from '@babel/traverse'
import * as t from '@babel/types'

/**
 * Extracts function parameters information from different types of function nodes
 */
interface FunctionParamsInfo {
  name: string
  params: t.Identifier[]
  startLine: number
}

function getFunctionParams(path: NodePath<t.Function>, parentName?: string): FunctionParamsInfo | null {
  let name = 'anonymous'
  let params: t.Identifier[] = []

  // Get function name based on type
  if (t.isFunctionDeclaration(path.node) && path.node.id) {
    name = path.node.id.name
  }
  else if (t.isVariableDeclarator(path.parent) && t.isIdentifier(path.parent.id)) {
    name = path.parent.id.name
  }
  else if (parentName) {
    name = parentName
  }

  // Get parameters
  params = path.node.params.filter((param): param is t.Identifier => {
    return t.isIdentifier(param)
  }) as t.Identifier[]

  return {
    name,
    params,
    startLine: path.node.loc?.start.line || 0,
  }
}

export { type FunctionParamsInfo, getFunctionParams }
