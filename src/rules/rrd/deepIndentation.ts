import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, global, tab, whitespace } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const WHITESPACE_TO_TABS = 3

const resetResults = () => (results.length = 0)

const checkDeepIndentation = (script: SFCScriptBlock | null, filePath: string, maxTabs: number) => {
  if (!script) {
    return
  }

    resetResults()

  const regex = createRegExp(tab.times.atLeast(maxTabs).at.lineStart().or(whitespace.times.atLeast(WHITESPACE_TO_TABS * maxTabs).at.lineStart()), [global])
  const content = skipComments(script.content)
  const matches = content.match(regex)

  let from = 0
  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match, from)
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>indentation: ${match.length}</bg_warn>`,
    })
    from = lineNumber
  })
}

const reportDeepIndentation = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ deep indentation</text_info>`,
        description: `👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

export { checkDeepIndentation, reportDeepIndentation }
