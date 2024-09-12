import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { createRegExp, exactly, global } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkImplicitParentChildCommunication = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const propsRegex = /defineProps\(([^)]+)\)/
  const vModelRegex = /v-model\s*=\s*"([^"]+)"/
  const parentRegex = createRegExp(exactly('$parent').or('getCurrentInstance'), [global])

  // Extract defined props
  const propsMatch = script.content.match(propsRegex)

  // Check for props mutation
  const vModelMatch = script.content.match(vModelRegex)
  if (vModelMatch) {
    const vModelProp = vModelMatch[1].split('.')[0]
    const definedProps = propsMatch ? propsMatch[1] : ''

    // Check if matched prop is inside `v-model` directive
    if (definedProps.includes(vModelProp)) {
      const lineNumber = getLineNumber(script.content.trim(), vModelProp)
      results.push({
        filePath,
        message: `line #${lineNumber} <bg_warn>(${vModelProp})</bg_warn>`,
      })
    }
  }

  // Check for $parent / getCurrentInstance
  const parentMatch = script.content.match(parentRegex)
  if (parentMatch) {
    const lineNumber = getLineNumber(script.content.trim(), parentMatch[0])
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>(${parentMatch[0]})</bg_warn>`,
    })
  }
}

const reportImplicitParentChildCommunication = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-caution ~ implicit parent-child communication</text_info>`,
        description: `👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  return offenses
}

const resetImplicitParentChildCommunicationFiles = () => (results.length = 0)

export { checkImplicitParentChildCommunication, reportImplicitParentChildCommunication, resetImplicitParentChildCommunicationFiles }
