import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { HtmlTags } from 'html-tags'
import type { FileCheckResult, Offense } from '../../types'

import htmlTags from 'html-tags'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkElementSelectorsWithScoped = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles) {
    return
  }

  const elementSelectorRegex = /([a-z]+)\s*\{[^}]*\}/gi

  styles.forEach((style) => {
    let match
    // eslint-disable-next-line no-cond-assign
    while ((match = elementSelectorRegex.exec(style.content)) !== null) {
      const selector = match[1] as HtmlTags
      if (htmlTags.includes(selector)) {
        results.push({ filePath, message: `<bg_warn>(${selector})</bg_warn>` })
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
        rule: `<text_info>vue-caution ~ element selectors with scoped</text_info>`,
        description: `👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped, resetResults }
