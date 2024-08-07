import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { caseInsensitive, createRegExp, global } from 'magic-regexp'
import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const simplePropFiles: { filePath: string }[] = []

const checkSimpleProp = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp('defineProps([', [global, caseInsensitive])
  const matches = script.content.match(regex)

  if (matches?.length) {
    simplePropFiles.push({ filePath })
  }
}

const reportSimpleProp = () => {
  const offenses: Offense[] = []

  if (simplePropFiles.length > 0) {
    simplePropFiles.forEach((file) => {
      offenses.push({
        file: file.filePath,
        rule: `${TEXT_INFO}vue-essential ~ simple prop${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Add at least type definition.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`,
        message: `🚨`,
      })
    })
  }
  return offenses
}

export { checkSimpleProp, reportSimpleProp }
