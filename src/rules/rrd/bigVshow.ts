import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { createRegExp } from 'magic-regexp'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

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
        message: `line #${lineNumber} ${BG_ERR}has a v-show with ${lineCount} lines${BG_RESET}`,
      })
      return
    }
    if (lineCount > MAX_VSHOW_LINES) {
      results.push({
        filePath,
        message: `line #${lineNumber} ${BG_WARN}has a v-show with ${lineCount} lines${BG_RESET}`,
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
        rule: `${TEXT_INFO}rrd ~ big v-show${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Big v-show can be moved out to its own component.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetBigVshow = () => (results.length = 0)

export { checkBigVshow, reportBigVshow, resetBigVshow }
