import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkBigVif = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  const MAX_VIF_LINES = 10

  const vifRegex = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  const vifMatches = template.content.match(vifRegex) || [];

  vifMatches.forEach((vifMatch) => {
    const lineCount = vifMatch.split('\n').length;

    const lineNumber = getLineNumber(template.content, vifMatch);
    if (lineCount > MAX_VIF_LINES * 2) {
      results.push({
        filePath,
        message: `line #${lineNumber} ${BG_ERR}has a v-if with ${lineCount} lines${BG_RESET}`,
      });
      return
    }
    if (lineCount > MAX_VIF_LINES) {
      results.push({
        filePath,
        message: `line #${lineNumber} ${BG_WARN}has a v-if with ${lineCount} lines${BG_RESET}`,
      });
    }
  });
}

const reportBigVif = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ big v-if${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Big v-if can be moved out to its own component.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetBigVif = () => (results.length = 0)

export { checkBigVif, reportBigVif, resetBigVif }
