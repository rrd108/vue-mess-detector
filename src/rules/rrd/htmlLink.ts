import { caseInsensitive, createRegExp, global, wordBoundary } from 'magic-regexp'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkHtmlLink = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }
  const regex = createRegExp('<a', wordBoundary, [global, caseInsensitive])
  // TODO - getLineNumber will not help us here as it will return the line number of the first match for all matches
  const matches = template.content.match(regex)

  if (matches?.length) {
    results.push({ filePath, message: `${matches?.length} ${BG_WARN}html link found${BG_RESET}` })
  }
}

const reportHtmlLink = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ html link${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use router-link or NuxtLink.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetHtmlLink = () => (results.length = 0)

export { checkHtmlLink, reportHtmlLink, resetHtmlLink }
