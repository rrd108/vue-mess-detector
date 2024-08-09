import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { caseInsensitive, charNotIn, createRegExp, global, oneOrMore } from 'magic-regexp'
import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const vforNoKeyFiles: { filePath: string }[] = []

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
      vforNoKeyFiles.push({ filePath })
    }
  }
}

const reportVforNoKey = () => {
  const offenses: Offense[] = []

  if (vforNoKeyFiles.length > 0) {
    vforNoKeyFiles.forEach((file) => {
      offenses.push({
        file: file.filePath,
        rule: `${TEXT_INFO}vue-essential ~ v-for has no key${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Add a \`:key\` property to all v-for.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`,
        message: `🚨`,
      })
    })
  }
  return offenses
}

const resetReportVForNoKey = () => (vforNoKeyFiles.length = 0)

export { checkVforNoKey, reportVforNoKey, resetReportVForNoKey }
