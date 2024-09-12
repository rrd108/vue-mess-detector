import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

interface AddFunctionToFilesParams {
  funcName: string
  funcBody: string
  lineNumber: number
  filePath: string
}

const results: FileCheckResult[] = []

// Maximum allowed function length in lines
// This is an arbitrary number defined by the rrd ruleset
export const MAX_FUNCTION_LENGTH = 20

const CONST_KEYWORD_LENGTH = 'const'.length
const FUNCTION_KEYWORD_LENGTH = 'function'.length

function addFunctionToFiles({ funcName, funcBody, lineNumber, filePath }: AddFunctionToFilesParams) {
  const lineCount = funcBody.split('\n').length

  const cleanedFuncName = cleanFunctionName(funcName)

  if (lineCount > 2 * MAX_FUNCTION_LENGTH) {
    results.push({ filePath, message: `function <bg_err>(${cleanedFuncName}#${lineNumber})</bg_err> is too long: <bg_err>${lineCount} lines</bg_err>` })
    return
  }
  if (lineCount >= MAX_FUNCTION_LENGTH) {
    results.push({ filePath, message: `function <bg_warn>(${cleanedFuncName}#${lineNumber})</bg_warn> is too long: <bg_warn>${lineCount} lines</bg_warn>` })
  }
}

function parseRegularFunction(content: string, startIndex: number) {
  // eslint-disable-next-line regexp/prefer-w
  const functionRegex = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g
  functionRegex.lastIndex = startIndex // Start search from the given index

  const match = functionRegex.exec(content)

  if (match) {
    const name = match[1]
    const bodyStartIndex = functionRegex.lastIndex
    let braceCount = 1 // To track the opening brace we just found
    let currentIndex = bodyStartIndex

    while (braceCount > 0 && currentIndex < content.length) {
      if (content[currentIndex] === '{') {
        braceCount++
      }
      else if (content[currentIndex] === '}') {
        braceCount--
      }
      currentIndex++
    }

    const body = content.slice(bodyStartIndex, currentIndex - 1).trim() // Extract the function body

    return {
      name,
      body,
      end: currentIndex, // Returns the position after the matched function
    }
  }
  else {
    return null
  }
}

function parseArrowFunction(content: string, index: number) {
  // Define regex to match arrow functions with or without curly braces
  // eslint-disable-next-line regexp/prefer-w, regexp/no-unused-capturing-group
  const regex = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/

  // Extract the substring starting from the current index
  const substring = content.slice(index)
  const match = regex.exec(substring)

  if (match) {
    const [, name] = match
    const bodyStartIndex = index + match.index + match[0].length // Calculate the start index of the function body
    let bodyEndIndex = bodyStartIndex
    let body = ''

    if (content[bodyStartIndex] === '{') {
      // If the function body starts with '{', we are dealing with a block arrow function
      let braceCount = 1 // Start with 1 to account for the opening brace
      bodyEndIndex = bodyStartIndex + 1 // Move past the opening brace

      while (bodyEndIndex < content.length && braceCount > 0) {
        // Traverse the content to find the closing brace
        if (content[bodyEndIndex] === '{') {
          braceCount++
        }
        else if (content[bodyEndIndex] === '}') {
          braceCount--
        }
        bodyEndIndex++ // Move to the next character
      }

      // Extract the function body, excluding the final closing brace
      body = content.slice(bodyStartIndex + 1, bodyEndIndex - 1).trim()
    }
    else {
      // If the function body does not start with '{', it's a concise body arrow function
      while (bodyEndIndex < content.length && content[bodyEndIndex] !== ';') {
        // Traverse until we find the end of the concise body (usually a semicolon)
        bodyEndIndex++
      }

      // Extract the function body up to the semicolon or end of content
      body = content.slice(bodyStartIndex, bodyEndIndex).trim()
    }

    return {
      name,
      body,
      end: bodyEndIndex, // Position after the end of the function body
    }
  }
  else {
    return null
  }
}

// Cleans the function name by removing any leading 'const' keyword.
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
      const regularFunctionInfo = parseRegularFunction(content, index)
      if (regularFunctionInfo) {
        isFunction = true
        funcName = regularFunctionInfo.name
        funcBody = regularFunctionInfo.body
        index = regularFunctionInfo.end
      }
    }
    if (content.slice(index, index + CONST_KEYWORD_LENGTH) === 'const') { // Check for arrow functions
      const arrowFunctionInfo = parseArrowFunction(content, index)
      if (arrowFunctionInfo) {
        isFunction = true
        funcName = arrowFunctionInfo.name
        funcBody = arrowFunctionInfo.body
        index = arrowFunctionInfo.end // move the index past the end of the function
      }
    }

    if (isFunction) {
      const lineNumber = getLineNumber(content.trim(), funcName)
      addFunctionToFiles({ funcName, funcBody, lineNumber, filePath })
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
        rule: `<text_info>rrd ~ function size</text_info>`,
        description: `👉 <text_warn>Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetFunctionSize = () => (results.length = 0)

export { checkFunctionSize, reportFunctionSize, resetFunctionSize }
