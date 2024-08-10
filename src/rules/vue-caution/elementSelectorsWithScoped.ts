import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { HtmlTags } from 'html-tags'
import htmlTags from 'html-tags'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkElementSelectorsWithScoped = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles)
    return

  const elementSelectorRegex = /([a-z]+)\s*\{[^}]*\}/gi

  styles.forEach((style) => {
    let match
    // eslint-disable-next-line no-cond-assign
    while ((match = elementSelectorRegex.exec(style.content)) !== null) {
      const selector = match[1] as HtmlTags
      if (htmlTags.includes(selector)) {
        results.push({ filePath, message: `${BG_WARN}(${selector})${BG_RESET}` })
      }
    }
  })
}

const reportElementSelectorsWithScoped = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-caution ~ element selectors with scoped${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  return offenses
}

const resetElementSelectorWithScoped = () => (results.length = 0)

export { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped, resetElementSelectorWithScoped }
