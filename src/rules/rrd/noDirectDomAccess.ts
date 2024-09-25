import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { anyOf, createRegExp, exactly, global, wordBoundary } from 'magic-regexp'
import { DOM_METHODS } from '../../helpers/constants'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkNoDirectDomAccess = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const regex = createRegExp(
    wordBoundary,
    anyOf(...DOM_METHODS.map(method => exactly(method))),
    '(',
    [global],
  )

  const matches = script.content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content.trim(), match)
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>Direct DOM access detected: ${match}</bg_warn>`,
    })
  })
}

const reportNoDirectDomAccess = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ no direct dom access</text_info>`,
        description: `👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkNoDirectDomAccess, reportNoDirectDomAccess }
