import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

interface FunctionSizeFile {
  filename: string
  funcName: string
}

const functionSizeFiles: FunctionSizeFile[] = []

export const MAX_FUNCTION_LENGTH = 20 // completely rrd made-up number

const addFunctionToFiles = (match: RegExpExecArray, filePath: string) => {
  const funcName = match[1]
  const funcBody = match[2]

  // Check if the function block has more than `MAX_FUNCTION_LENGTH` lines
  const lineCount = funcBody.split('\n').length
  if (lineCount > MAX_FUNCTION_LENGTH) {
    functionSizeFiles.push({ filename: filePath, funcName })
  }
}

const checkFunctionSize = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regexNormalFunction
    = /function\s+([\w$]+)\s*\([^)]*\)\s*\{([^{}]*(([^{}]*\{[^{}]*\}[^{}]*)*[^{}]*))\}/g
  const regexArrowFunction
    = /const\s+([\w$]+)\s*=\s*\([^)]*\)\s*=>\s*\{([^{}]*(([^{}]*\{[^{}]*\}[^{}]*)*[^{}]*))\}/g
  // TODO it does not match arrow functions with no curly braces

  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = regexNormalFunction.exec(script.content)) !== null) {
    addFunctionToFiles(match, filePath)
  }

  // TODO temporary switch off see #116

  // while ((match = regexArrowFunction.exec(script.content)) !== null) {
  //  addFunctionToFiles(match, filePath)
  // }
}

const reportFunctionSize = () => {
  const offenses: Offense[] = []

  if (functionSizeFiles.length > 0) {
    functionSizeFiles.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines${TEXT_RESET}`,
        message: `function ${BG_ERR}(${file.funcName})${BG_RESET} 🚨`,
      })
    })
  }
  return offenses
}

const resetFunctionSize = () => (functionSizeFiles.length = 0)

export { checkFunctionSize, reportFunctionSize, resetFunctionSize }
