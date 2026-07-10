import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkUseShallowRef = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = skipComments(script.content)

  // Match ref() declarations: const name = ref(...) or const name = ref<...>(...)
  const refRegex = /(?:const|let)\s+(\w+)\s*=\s*ref\s*(?:<[^>]+>\s*)?\(/g

  const refDeclarations: { name: string, match: string }[] = []
  const refMatches = content.matchAll(refRegex)
  for (const refMatch of refMatches) {
    refDeclarations.push({ name: refMatch[1], match: refMatch[0] })
  }

  refDeclarations.forEach(({ name, match }) => {
    // Check if .value is ever reassigned: name.value = ..., name.value +=, name.value++, etc.
    // This pattern matches assignment or mutation to .value (not just reading it)
    const assignmentRegex = new RegExp(`${name}\\.value\\s*(?:=|\\+=|-=|\\*=|\\/=|%=|\\*\\*=|&&=|\\|\\|=|\\?\\?=|\\+\\+|--)|(?:\\+\\+|--)\\s*${name}\\.value`)
    const isReassigned = assignmentRegex.test(content)

    // Also check for .value mutations via methods like push, pop, etc. on arrays/objects
    // These only matter for deep reactivity — shallowRef still tracks .value replacement
    // So we only flag if .value is never assigned at all

    if (!isReassigned) {
      const lineNumber = getLineNumber(content, match)
      results.push({
        filePath,
        message: `line #${lineNumber} <bg_warn>ref used but .value is never reassigned: ${match}</bg_warn>`,
      })
    }
  })
}

const reportUseShallowRef = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ use Shallow Ref</text_info>`,
        description: `👉 <text_warn>Consider using \`shallowRef()\` instead of \`ref()\` when the value is never reassigned. This avoids deep reactivity overhead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/use-shallow-ref.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkUseShallowRef, reportUseShallowRef }
