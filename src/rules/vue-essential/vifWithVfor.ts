import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { caseInsensitive, charNotIn, createRegExp, global, oneOrMore } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkVifWithVfor = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }
  const regex1 = createRegExp(
    '<',
    oneOrMore(charNotIn('>')),
    ' v-if',
    oneOrMore(charNotIn('>')),
    ' v-for',
    oneOrMore(charNotIn('>')),
    '>',
    [global, caseInsensitive],
  )
  const regex2 = createRegExp(
    '<',
    oneOrMore(charNotIn('>')),
    ' v-for',
    oneOrMore(charNotIn('>')),
    ' v-if',
    oneOrMore(charNotIn('>')),
    '>',
    [global, caseInsensitive],
  )
  const matches1 = template.content.match(regex1)
  const matches2 = template.content.match(regex2)

  if (matches1?.length || matches2?.length) {
    const match = matches1?.length ? matches1[0] : matches2?.length ? matches2[0] : ''
    const lineNumber = getLineNumber(template.content, match)
    results.push({ filePath, message: `line #${lineNumber} <bg_err>v-if used with v-for</bg_err>` })
  }
}

const reportVifWithVfor = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-essential ~ v-if used with v-for</text_info>`,
        description: `👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetVIfWithVFor = () => (results.length = 0)

export { checkVifWithVfor, reportVifWithVfor, resetVIfWithVFor }
