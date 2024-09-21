import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { caseInsensitive, charNotIn, createRegExp, global, oneOrMore } from 'magic-regexp'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkVforNoKey = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  const regex = createRegExp('<', oneOrMore(charNotIn('>')), ' v-for', oneOrMore(charNotIn('>')), '>', [
    global,
    caseInsensitive,
  ])
  const matches = template.content.match(regex)

  if (matches?.length) {
    const hasKey = matches.some(match => match.includes(':key'))
    if (!hasKey) {
      results.push({ filePath, message: `v-for used <bg_err>without a key</bg_err>` })
    }
  }
}

const reportVforNoKey = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-essential ~ v-for has no key</text_info>`,
        description: `👉 <text_warn>Add a \`:key\` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkVforNoKey, reportVforNoKey }
