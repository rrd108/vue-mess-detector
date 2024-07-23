import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from '../asceeCodes'

const parameterCountFiles: { filename: string; funcName: string; paramsCount: number }[] = []

const MAX_PARAMETER_COUNT = 3 // completely rrd made-up number

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
  const regex = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g
  let match

  while ((match = regex.exec(script.content)) !== null) {
    if (match[1]) {
      // Regular function
      checkParameters(match[1], match[2], filePath) // match[2] are the params for current regular function
    } else if (match[3]) {
      // Arrow function
      checkParameters(match[3], match[4], filePath) // match[4] are the params for current arrow function
    }
  }
}

const reportParameterCount = () => {
  if (parameterCountFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}rrd${TEXT_RESET} ${BG_WARN}parameter count${BG_RESET} exceeds recommended limit in ${parameterCountFiles.length} files.`
    )
    console.log(`👉 ${TEXT_WARN}Max number of function parameters should be ${MAX_PARAMETER_COUNT}${TEXT_RESET}`)
    parameterCountFiles.forEach(file => {
      console.log(
        `- ${BG_WARN}${file.funcName}${BG_RESET} in file ${file.filename} 🚨 ${BG_WARN}(${file.paramsCount})${BG_RESET}`
      )
    })
  }

  return parameterCountFiles.length
}

export { checkParameterCount, reportParameterCount }
