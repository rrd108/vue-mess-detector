import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkNoPropDestructure = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  // Vue 3.5 makes variables destructured directly from the defineProps macro
  // reactive at compile time. Destructuring a runtime props object still loses
  // reactivity, so only report that unsafe form.
  const regex = /(?:const|let)\s*\{[^}]+\}\s*=\s*props\b/g

  const content = skipComments(script.content)
  const matches = content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>props destructuring found: ${match}</bg_warn>`,
    })
  })
}

const reportNoPropDestructure = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description: `👉 <text_warn>Avoid destructuring a runtime props object because it loses reactivity. Access \`props.propName\` instead, or destructure directly from \`defineProps()\` in Vue 3.5+.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkNoPropDestructure, reportNoPropDestructure }
