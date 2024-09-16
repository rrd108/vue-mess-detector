import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkBigVshow = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  const MAX_VSHOW_LINES = 10

  // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
  const vifRegex = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi
  const vshowMatches = template.content.match(vifRegex) || []

  vshowMatches.forEach((vifMatch) => {
    const lineCount = vifMatch.split('\n').length

    const lineNumber = getLineNumber(template.content, vifMatch)
    if (lineCount > MAX_VSHOW_LINES * 2) {
      results.push({
        filePath,
        message: `line #${lineNumber} <bg_err>has a v-show with ${lineCount} lines</bg_err>`,
      })
      return
    }
    if (lineCount > MAX_VSHOW_LINES) {
      results.push({
        filePath,
        message: `line #${lineNumber} <bg_warn>has a v-show with ${lineCount} lines</bg_warn>`,
      })
    }
  })
}

const reportBigVshow = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ big v-show</text_info>`,
        description: `👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetBigVshow = () => (results.length = 0)

export { checkBigVshow, reportBigVshow, resetBigVshow }
