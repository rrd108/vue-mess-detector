import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { char, createRegExp, oneOrMore, whitespace } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

/* TODO use the correct parameter from the following list:
  - "script: SFCScriptBlock" ~ this rule will apply to ts, js and vue files
  - "styles: SFCStyleBlock[]" ~ applied only for vue files
  - "template: SFCTemplateBlock" ~ applied only for vue files
  - "descriptor: SFCDescriptor" ~ applied only for vue files
*/
const checkNestedTernary = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(oneOrMore(char), whitespace, '?', whitespace, oneOrMore(char), whitespace, ':', whitespace, oneOrMore(char))

  const matches = script.content.match(regex)

  // TODO add your rule logic, constants, etc here

  matches?.forEach((match) => {
    if (match.split('?').length - 1 > 1) {
      const lineNumber = getLineNumber(script.content, match)
      results.push({
        filePath,
        message: `line #${lineNumber} has ${BG_WARN}nested ternary${BG_RESET}`,
      })
    }
  })
}

const reportNestedTernary = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ nested Ternary${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}/* TODO tip to fix this issue */.${TEXT_RESET} See: https:///* TODO doc link */`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetNestedTernary = () => (results.length = 0)

export { checkNestedTernary, reportNestedTernary, resetNestedTernary }
