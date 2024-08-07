import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { caseInsensitive, createRegExp, global, wordBoundary } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const elseConditionFiles: { fileName: string, elseCount: number }[] = []

const checkElseCondition = (script: SFCScriptBlock | null, file: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(wordBoundary, 'else', wordBoundary, [global, caseInsensitive])
  const matches = script.content.match(regex)

  if (matches?.length) {
    elseConditionFiles.push({ fileName: file, elseCount: matches.length })
  }
}

const reportElseCondition = () => {
  const offenses: Offense[] = []

  if (elseConditionFiles.length > 0) {
    elseConditionFiles.forEach((file) => {
      offenses.push({
        file: file.fileName,
        rule: `${BG_WARN}rrd ~ else conditions${BG_RESET}`,
        title: '',
        description: `👉 ${TEXT_WARN}Try to rewrite the conditions in a way that the else clause is not necessary.${TEXT_RESET}`,
        message: `${BG_WARN}(${file.elseCount})${BG_RESET} 🚨`,
      })
    })
  }
  return offenses
}

export { checkElseCondition, reportElseCondition }
