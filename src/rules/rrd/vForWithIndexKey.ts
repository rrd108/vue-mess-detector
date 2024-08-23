import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { createRegExp, global, oneOrMore, whitespace, wordChar } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkVForWithIndexKey = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  const vForRegex = createRegExp('v-for="(', whitespace.times.any(), oneOrMore(wordChar).grouped(), whitespace.times.any(), ',', whitespace.times.any(), oneOrMore(wordChar).grouped(), whitespace.times.any(), ')', oneOrMore(whitespace), 'in', oneOrMore(whitespace), oneOrMore(wordChar).grouped(), [global])
  const keyRegex = createRegExp(':key="', whitespace.times.any(), oneOrMore(wordChar).grouped(), whitespace.times.any(), '"', [global])

  const matches = [...template.content.matchAll(vForRegex)]
  const keyMatches = [...template.content.matchAll(keyRegex)]

  matches.forEach((match) => {
    const [_, item, index, array] = match

    keyMatches.forEach((keyMatch) => {
      const key = keyMatch[1]

      if (key === index) {
        const lineNumber = getLineNumber(template.content.trim(), key as string)
        results.push({
          filePath,
          message: `line #${lineNumber} ${BG_WARN}index is being used as :key in v-for${BG_RESET}`,
        })
      }
    })
  })
}

const reportVForWithIndexKey = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ VFor With Index Key${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid using index as key in v-for loops.${TEXT_RESET} See: https://`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetVForWithIndexKey = () => (results.length = 0)

export { checkVForWithIndexKey, reportVForWithIndexKey, resetVForWithIndexKey }
