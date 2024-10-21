import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, exactly, global } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkNoSkippedTests = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script || !filePath.includes('.test')) {
    return
  }

  const regex = createRegExp('.', exactly('skipIf').or('skip').or('todo').grouped(), [global])

  const content = skipComments(script.content.trim())
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    const match = line.match(regex)
    if (match) {
      results.push({
        filePath,
        message: `line #${idx + 1} <bg_warn>skip test found: "${match[0]}"</bg_warn>`,
      })
    }
  })
}

const reportNoSkippedTests = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ no skipped tests</text_info>`,
        description: `👉 <text_warn>Skipped or todo tests were found. These should be addressed before merging.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-skipped-tests.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkNoSkippedTests, reportNoSkippedTests }
