import { caseInsensitive, charNotIn, createRegExp, global, oneOrMore } from 'magic-regexp'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

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
    results.push({ filePath, message: `line #${lineNumber} ${BG_ERR}v-if used with v-for${BG_RESET}` })
  }
}

const reportVifWithVfor = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-essential ~ v-if used with v-for${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Move out the v-if to a computed property.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetVIfWithVFor = () => (results.length = 0)

export { checkVifWithVfor, reportVifWithVfor, resetVIfWithVFor }
