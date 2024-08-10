import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { caseInsensitive, createRegExp, global, tab, whitespace } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const MAX_TABS = 5
const WHITESPACE_TO_TABS = 3

const checkDeepIndentation = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(tab.times.atLeast(MAX_TABS).or(whitespace.times.atLeast(WHITESPACE_TO_TABS * MAX_TABS)), [
    global,
    caseInsensitive,
  ])
  const matches = script.content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    results.push({
      filePath,
      message: `line #${lineNumber} ${BG_WARN}indentation: ${match.length}${BG_RESET}`,
    })
  })
}

const reportDeepIndentation = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ deep indentation${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Try to refactor your component to child components, to avoid deep indentations.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetDeepIndentation = () => (results.length = 0)

export { checkDeepIndentation, reportDeepIndentation, resetDeepIndentation }
