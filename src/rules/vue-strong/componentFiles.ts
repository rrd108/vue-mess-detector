import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkComponentFiles = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  // regular expression to match `.component('anyString', { ... })` pattern
  const regex = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g

  const matches = [...script.content.matchAll(regex)].map(match => match[1].trim())

  matches.forEach((match) => {
    const lineNumber = getLineNumber(script.content.trim(), match)
    const firstPart = match.split('\n').at(0)?.trim() || ''
    results.push({ filePath, message: `line #${lineNumber} <bg_warn>(${firstPart})</bg_warn>` })
  })
}

const reportComponentFiles = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ component files</text_info>`,
        description: `👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetComponentFiles = () => (results.length = 0)

export { checkComponentFiles, reportComponentFiles, resetComponentFiles }
