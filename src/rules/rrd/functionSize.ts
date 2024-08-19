import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

export const MAX_FUNCTION_LENGTH = 20 // completely rrd made-up number

const CONST_KEYWORD_LENGTH = 'const'.length
const FUNCTION_KEYWORD_LENGTH = 'function'.length

function addFunctionToFiles(funcName: string, funcBody: string, filePath: string) {
  const lineCount = funcBody.split('\n').length
  if (lineCount > MAX_FUNCTION_LENGTH) {
    results.push({ filePath, message: `function ${BG_ERR}(${cleanFunctionName(funcName)})${BG_RESET} is too long` })
  }
}

// Helper to parse the function name after the 'function' keyword
function parseFunctionName(content: string, startIndex: number): string {
  let name = ''
  let i = startIndex

  // Skip whitespace and move to the function name
  while (i < content.length && /\s/.test(content[i])) {
    i++
  }

  // Capture the function name and skip the 'const' keyword if it's an arrow function
  if (content.slice(i, i + 5) === 'const') {
    i += 5
    // Skip any whitespace after 'const'
    while (i < content.length && /\s/.test(content[i])) {
      i++
    }
  }

  // Now capture the actual function name
  while (i < content.length && /[\w$]/.test(content[i])) {
    name += content[i]
    i++
  }

  return name.trim()
}

// Helper to skip to the start of the function body
function skipToFunctionBody(content: string, startIndex: number): number {
  let i = startIndex

  // Skip to the start of the function body '{'
  while (i < content.length && content[i] !== '{') {
    i++
  }

  return i + 1 // Move to the first character inside the '{'
}

// Helper to parse arrow function
function parseArrowFunction(content: string, startIndex: number) {
  let name = ''
  let bodyStart = -1

  // Find variable name
  while (startIndex < content.length && content[startIndex] !== '=') {
    if (/\w/.test(content[startIndex])) {
      name += content[startIndex]
    }
    startIndex++
  }

  // Skip arrow syntax (=>)
  startIndex = content.indexOf('=>', startIndex)
  if (startIndex === -1)
    return null
  bodyStart = startIndex + 2

  return { name, bodyStart }
}

// Helper to extract the function body by counting braces
function extractFunctionBody(content: string, startIndex: number) {
  let openBraces = 1
  let body = ''
  let endIndex = startIndex

  while (endIndex < content.length && openBraces > 0) {
    const char = content[endIndex]

    if (char === '{')
      openBraces++
    if (char === '}')
      openBraces--
    body += char
    endIndex++
  }

  return { body, end: endIndex }
}

function cleanFunctionName(funcName: string): string {
  return funcName.replace(/^const\s*/, '')
}

const checkFunctionSize = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = script.content
  const length = content.length
  let index = 0

  while (index < length) {
    let funcName = ''
    let funcBody = ''
    let isFunction = false

    // Search for a function declaration or arrow function
    if (content.slice(index, index + 8) === 'function') {
      index += 8
      isFunction = true
      funcName = parseFunctionName(content, index)
      index = skipToFunctionBody(content, index)
    }
    
    if (content.slice(index, index + CONST_KEYWORD_LENGTH) === 'const') {
      const arrowFunctionInfo = parseArrowFunction(content, index)
      if (arrowFunctionInfo) {
        isFunction = true
        funcName = arrowFunctionInfo.name
        index = arrowFunctionInfo.bodyStart
      }
    }

    if (isFunction) {
      const { body, end } = extractFunctionBody(content, index)
      funcBody = body
      index = end
      addFunctionToFiles(funcName, funcBody, filePath)
    }
    if (!isFunction) {
      index++
    }
  }
}

const reportFunctionSize = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetFunctionSize = () => (results.length = 0)

export { checkFunctionSize, reportFunctionSize, resetFunctionSize }
