import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { caseInsensitive, createRegExp, global } from 'magic-regexp'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkSimpleProp = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp('defineProps([', [global, caseInsensitive])
  const matches = script.content.match(regex)

  if (matches?.length) {
    results.push({ filePath, message: `${BG_ERR}Props type${BG_RESET} not defined` })
  }
}

const reportSimpleProp = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-essential ~ simple prop${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Add at least type definition.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetSimpleProp = () => (results.length = 0)

export { checkSimpleProp, reportSimpleProp, resetSimpleProp }
