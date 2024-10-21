import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { skipComments } from '../../helpers/skipComments'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkNestedTernary = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = skipComments(script.content.trim())
  const lines = content.split('\n')

  // In here we use `index` as lineNumber because we are splitting the content by new lines
  lines.forEach((line, index) => {
    // Remove string literals to avoid false positives
    const lineWithoutStrings = line.replace(/'[^']*'|"[^"]*"/g, '')

    // Remove nullish coalescing and optional chaining operators
    const cleanedLine = lineWithoutStrings.replace(/\?\?|\?\./g, '  ')

    // Regex to match nested ternaries
    const nestedTernaryRegex = /\?[^:?]*\?[^:?]*:[^:?]*:/

    if (nestedTernaryRegex.test(cleanedLine)) {
      results.push({
        filePath,
        message: `line #${index + 1} has <bg_warn>nested ternary</bg_warn>`,
      })
    }
  })
}

const reportNestedTernary = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ nested Ternary</text_info>`,
        description: `👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkNestedTernary, reportNestedTernary }
