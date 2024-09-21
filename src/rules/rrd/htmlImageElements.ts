import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, exactly, global } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

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
        message: `line #${lineNumber} <bg_warn>${element} element found</bg_warn>`,
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
        rule: `<text_info>rrd ~ html image elements</text_info>`,
        description: `👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkHtmlImageElements, reportHtmlImageElements }
