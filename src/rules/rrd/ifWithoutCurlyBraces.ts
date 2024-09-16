import type { SFCScriptBlock } from '@vue/compiler-sfc'

import { skipComments } from '../../helpers/skipComments'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkIfWithoutCurlyBraces = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = skipComments(script.content)
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    // Check if the line contains an `if` statement and is not followed by curly braces
    if (trimmedLine.startsWith('if (') && !trimmedLine.includes('{')) {
      // Check if the next line is not a continuation of the if statement with curly braces
      const nextLine = lines[index + 1]?.trim()
      if (!nextLine || (!nextLine.startsWith('{') && !trimmedLine.endsWith('{'))) {
        results.push({
          filePath,
          message: `line #${index} if statement without curly braces: <bg_err>${trimmedLine}</bg_err>`,
        })
      }
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
  return offenses
}

const resetIfWithoutCurlyBraces = () => (results.length = 0)

export { checkIfWithoutCurlyBraces, reportIfWithoutCurlyBraces, resetIfWithoutCurlyBraces }
