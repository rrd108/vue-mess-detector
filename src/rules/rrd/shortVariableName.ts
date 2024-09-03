import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

export const MIN_VARIABLE_NAME = 4 // completely rrd made-up number

const allowedVariableNames = ['i', 'key']

const checkShortVariableName = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  // Regular expression to match variable names
  const regex = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g

  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    const variable = match[1]

    if (variable.length < MIN_VARIABLE_NAME && !allowedVariableNames.includes(variable)) {
      results.push({ filePath, message: `variable: ${BG_WARN}(${variable})${BG_RESET}` })
    }
  }
}

const reportShortVariableName = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ short variable names${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Variable names must have a minimum length of ${MIN_VARIABLE_NAME}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetShortVariableName = () => (results.length = 0)

export { checkShortVariableName, reportShortVariableName, resetShortVariableName }
