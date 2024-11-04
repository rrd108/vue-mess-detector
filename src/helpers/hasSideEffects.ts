import traverse from '@babel/traverse'
import * as t from '@babel/types'

/**
 * Checks if a node contains side effects like assignments or array mutations
 */
export function hasSideEffects(node: t.Node): boolean {
  let foundSideEffect = false

  // Convert the visitor object to a function that handles each node
  traverse.cheap(node, (node) => {
    if (t.isAssignmentExpression(node)) {
      foundSideEffect = true
    }
    if (t.isCallExpression(node)) {
      const callee = node.callee
      if (t.isMemberExpression(callee)) {
        const propertyName = t.isIdentifier(callee.property) ? callee.property.name : ''
        const mutatingMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort']
        if (mutatingMethods.includes(propertyName)) {
          foundSideEffect = true
        }
      }
    }
  })
  return foundSideEffect
}
