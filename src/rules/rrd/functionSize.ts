import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

export const MAX_FUNCTION_LENGTH = 20 // completely rrd made-up number
const CONST_KEYWORD_LENGTH = 'const'.length
const FUNCTION_KEYWORD_LENGTH = 'function'.length

function addFunctionToFiles(funcName: string, funcBody: string, filePath: string) {
  const lineCount = funcBody.split('\n').length
  if (lineCount > 2 * MAX_FUNCTION_LENGTH) {
    results.push({ filePath, message: `function ${BG_ERR}(${cleanFunctionName(funcName)})${BG_RESET} is too long: ${BG_ERR}${lineCount} lines${BG_RESET}` })
    return
  }
  if (lineCount >= MAX_FUNCTION_LENGTH) {
    results.push({ filePath, message: `function ${BG_WARN}(${cleanFunctionName(funcName)})${BG_RESET} is too long: ${BG_WARN}${lineCount} lines${BG_RESET}` })
  }
}

function parseFunctionName(content: string, startIndex: number): string {
  let name = ''
  let i = startIndex

  // Skip whitespace and move to the function name
  while (i < content.length && /\s/.test(content[i])) {
    i++
  }

  while (i < content.length && /[\w$]/.test(content[i])) {
    name += content[i]
    i++
  }

  return name.trim()
}

function skipToFunctionBody(content: string, startIndex: number): number {
  let i = startIndex

  while (i < content.length && content[i] !== '{') {
    i++
  }

  return i + 1 // Move to the first character inside the '{'
}

function parseArrowFunction(content: string, index: number) {
  // Define regex to match arrow functions
  // eslint-disable-next-line regexp/prefer-w, regexp/no-unused-capturing-group
  const regex = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*\{/

  // Extract the substring starting from the current index
  const substring = content.slice(index)
  const match = regex.exec(substring)

  if (match) {
    const [, name, , params] = match

    // Find the closing brace for the function body
    let braceCount = 1 // We have already encountered the opening brace
    const bodyStartIndex = index + match.index + match[0].length
    let bodyEndIndex = bodyStartIndex

    while (bodyEndIndex < content.length && braceCount > 0) {
      if (content[bodyEndIndex] === '{') {
        braceCount++
      }
      else if (content[bodyEndIndex] === '}') {
        braceCount--
      }
      bodyEndIndex++
    }

    // Extract the function body
    const body = content.slice(bodyStartIndex, bodyEndIndex - 1).trim() // Exclude the final '}'

    console.log('FUNCTION NAME:::', name)
    console.log('FUNCTION PARAMS:::', params)
    console.log('FUNCTION BODY:::', body)

    return {
      name,
      body: `{${body}}`, // Wrap body in curly braces to ensure proper structure
      end: bodyEndIndex, // Position after the end of the function body
    }
  }
  else {
    console.log('NO MATCH FOUND')
    return null
  }
}

function extractFunctionBody(content: string, startIndex: number) {
  let openBraces = 1
  let body = ''
  let endIndex = startIndex

  while (endIndex < content.length && openBraces > 0) {
    const char = content[endIndex]

    if (char === '{') {
      openBraces++
    }
    if (char === '}') {
      openBraces--
    }
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

    // Check for function declarations
    if (content.slice(index, index + FUNCTION_KEYWORD_LENGTH) === 'function') {
      index += FUNCTION_KEYWORD_LENGTH
      isFunction = true
      funcName = parseFunctionName(content, index)
      index = skipToFunctionBody(content, index)

      const { body, end } = extractFunctionBody(content, index)
      funcBody = body
      index = end
    }

    // Check for arrow functions
    if (content.slice(index, index + CONST_KEYWORD_LENGTH) === 'const') {
      const arrowFunctionInfo = parseArrowFunction(content, index)
      if (arrowFunctionInfo) {
        isFunction = true
        funcName = arrowFunctionInfo.name
        funcBody = arrowFunctionInfo.body
        index += arrowFunctionInfo.end // move the infex past the end of the function
      }
    }

    if (isFunction) {
      addFunctionToFiles(funcName, funcBody, filePath)
    }
    else {
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
