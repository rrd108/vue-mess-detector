import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const parameterCountFiles: { filename: string, funcName: string, paramsCount: number }[] = []

export const MAX_PARAMETER_COUNT = 3 // completely rrd made-up number

// Function used in both scenarios (regular and arrow function) to count parameters
const checkParameters = (funcName: string, params: string, filePath: string) => {
  const paramsArray = params
    .split(',')
    .map(param => param.trim())
    .filter(param => param.length > 0)
  if (paramsArray.length > MAX_PARAMETER_COUNT) {
    parameterCountFiles.push({ filename: filePath, funcName, paramsCount: paramsArray.length })
  }
}

const checkParameterCount = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  // regular expression to match both regular and arrow functions and capture their params
  const regex = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    if (match[1]) {
      // Regular function
      checkParameters(match[1], match[2], filePath) // match[2] are the params for current regular function
    }
    else if (match[3]) {
      // Arrow function
      checkParameters(match[3], match[4], filePath) // match[4] are the params for current arrow function
    }
  }
}

const reportParameterCount = () => {
  const offenses: Offense[] = []

  if (parameterCountFiles.length > 0) {
    parameterCountFiles.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${TEXT_INFO}rrd ~ parameter count${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Max number of function parameters should be ${MAX_PARAMETER_COUNT}${TEXT_RESET}`,
        message: `function ${BG_WARN}${file.funcName}${BG_RESET} has ${BG_WARN}${file.paramsCount}${BG_RESET} parameters 🚨`,
      })
    })
  }

  return offenses
}

const resetParameterCount = () => (parameterCountFiles.length = 0)

export { checkParameterCount, reportParameterCount, resetParameterCount }
