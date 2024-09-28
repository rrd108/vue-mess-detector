import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import { skipComments } from '../../helpers/skipComments'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkIfWithoutCurlyBraces = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = skipComments(script.content)
  const lines = content.split('\n')

  let openParentheses = 0
  let ifStartIndex: number | null = null

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    // Count open and closed parentheses
    openParentheses += (trimmedLine.match(/\(/g) || []).length
    openParentheses -= (trimmedLine.match(/\)/g) || []).length

    if (trimmedLine.startsWith('if (') && ifStartIndex === null) {
      ifStartIndex = index
    }

    // Check if the if statement is complete
    if (ifStartIndex !== null && openParentheses === 0) {
      const ifStatement = lines.slice(ifStartIndex, index + 1).join(' ')
      if (!ifStatement.includes('{')) {
        const nextLine = lines[index + 1]?.trim()
        if (!nextLine || (!nextLine.startsWith('{') && !trimmedLine.endsWith('{'))) {
          results.push({
            filePath,
            message: `line #${ifStartIndex} if statement without curly braces: <bg_err>${ifStatement.trim()}</bg_err>`,
          })
        }
      }
      ifStartIndex = null
    }
  })
}

const reportIfWithoutCurlyBraces = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ if without curly braces</text_info>`,
        description: `👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkIfWithoutCurlyBraces, reportIfWithoutCurlyBraces }
