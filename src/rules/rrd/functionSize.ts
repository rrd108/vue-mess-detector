import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

interface FunctionSizeFile {
  filename: string
  funcName: string
}

const functionSizeFiles: FunctionSizeFile[] = []

export const MAX_FUNCTION_LENGTH = 20 // completely rrd made-up number

const checkFunctionSize = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  // Regular expression to match function definitions (both regular and arrow functions)
  const regex
    = /function\s+([\w$]+)\s*\([^)]*\)\s*\{([^{}]*(([^{}]*\{[^{}]*\}[^{}]*)*[^{}]*))\}|const\s+([\w$]+)\s*=\s*\([^)]*\)\s*=>\s*\{([^{}]*(([^{}]*\{[^{}]*\}[^{}]*)*[^{}]*))\}/g
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    /*
      We use match[1] and match[2] for regular functions
      and match[5] and match[6] for arrow functions
    */
    const funcName = match[1] || match[5]
    const funcBody = match[2] || match[6]

    // Check if the function block has more than `MAX_FUNCTION_LENGTH` lines
    const lineCount = funcBody.split('\n').length
    if (lineCount > MAX_FUNCTION_LENGTH) {
      functionSizeFiles.push({ filename: filePath, funcName })
    }
  }
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
