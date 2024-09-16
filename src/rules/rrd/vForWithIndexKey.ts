import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { createRegExp, global, oneOrMore, whitespace, wordChar } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

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
    // eslint-disable-next-line unused-imports/no-unused-vars
    const [_, item, index, array] = match

    keyMatches.forEach((keyMatch) => {
      const key = keyMatch[1]

      if (key === index) {
        const lineNumber = getLineNumber(template.content.trim(), key as string)
        results.push({
          filePath,
          message: `line #${lineNumber} <bg_warn>index is being used as :key in v-for</bg_warn>`,
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
        rule: `<text_info>rrd ~ VFor With Index Key</text_info>`,
        description: `👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetVForWithIndexKey = () => (results.length = 0)

export { checkVForWithIndexKey, reportVForWithIndexKey, resetVForWithIndexKey }
