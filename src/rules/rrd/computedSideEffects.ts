import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkComputedSideEffects = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const computedRegex = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const sideEffectRegex = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/

  const matches = [...script.content.matchAll(computedRegex)]

  matches.forEach((match) => {
    const computedBody = match[1]
    if (sideEffectRegex.test(computedBody)) {
      const lineNumber = getLineNumber(script.content.trim(), match[0])
      const trimmedBody = computedBody.trim()
      const truncatedBody = trimmedBody.length > 20 ? trimmedBody.slice(0, 20) : trimmedBody
      results.push({
        filePath,
        message: `line #${lineNumber} side effect detected in computed property ${BG_ERR}(${truncatedBody})${BG_RESET}`,
      })
    }
  })
}

const reportComputedSideEffects = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ computed side effects${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid side effects in computed properties. Computed properties should only derive and return a value.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetComputedSideEffects = () => (results.length = 0)

export { checkComputedSideEffects, reportComputedSideEffects, resetComputedSideEffects }
