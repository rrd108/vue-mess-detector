import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { createRegExp, exactly, global } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkHtmlImageElements = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }
  const regex = createRegExp('<', exactly('img').or('picture'), [global])
  const matches = template.content.match(regex)

  if (matches?.length) {
    let from = 0
    matches.forEach((match) => {
      const lineNumber = getLineNumber(template.content, match, from)
      const element = match.slice(1) // Remove the '<' from the match
      results.push({
        filePath,
        message: `line #${lineNumber} ${BG_WARN}${element} element found${BG_RESET}`,
      })
      from = lineNumber
    })
  }
}

const reportHtmlImageElements = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ html image elements${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetHtmlImageElements = () => (results.length = 0)

export { checkHtmlImageElements, reportHtmlImageElements, resetHtmlImageElements }
