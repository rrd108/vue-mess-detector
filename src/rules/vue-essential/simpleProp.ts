import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { caseInsensitive, createRegExp, global } from 'magic-regexp'

const results: FileCheckResult[] = []

const checkSimpleProp = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp('defineProps([', [global, caseInsensitive])
  const matches = script.content.match(regex)

  if (matches?.length) {
    results.push({ filePath, message: `<bg_err>Props type</bg_err> not defined` })
  }
}

const reportSimpleProp = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-essential ~ simple prop</text_info>`,
        description: `👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetSimpleProp = () => (results.length = 0)

export { checkSimpleProp, reportSimpleProp, resetSimpleProp }
