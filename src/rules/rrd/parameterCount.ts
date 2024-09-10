import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

export const MAX_PARAMETER_COUNT = 3 // completely rrd made-up number

// Function used in both scenarios (regular and arrow function) to count parameters
const checkParameters = (funcName: string, params: string, filePath: string) => {
  const paramsArray = params
    .split(',')
    .map(param => param.trim())
    .filter(param => param.length > 0)
  if (paramsArray.length > MAX_PARAMETER_COUNT) {
    results.push({ filePath, message: `function <bg_warn>${funcName}</bg_warn> has <bg_warn>${paramsArray.length}</bg_warn> parameters` })
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
    if (match[3]) {
      // Arrow function
      checkParameters(match[3], match[4], filePath) // match[4] are the params for current arrow function
    }
  }
}

const reportParameterCount = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ parameter count</text_info>`,
        description: `👉 <text_warn>Max number of function parameters should be ${MAX_PARAMETER_COUNT}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  return offenses
}

const resetParameterCount = () => (results.length = 0)

export { checkParameterCount, reportParameterCount, resetParameterCount }
