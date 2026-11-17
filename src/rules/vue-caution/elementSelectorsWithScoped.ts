import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { HtmlTags } from 'html-tags'
import type { FileCheckResult, Offense } from '../../types'

import htmlTags from 'html-tags'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

// the text before each `{` that is not inside a declaration (handles nesting and at-rules)
const selectorPreludeRegex = /([^{};]+)\{/g

/**
 * Returns the tag name when the selector's last compound (the one Vue adds the scope attribute to)
 * is a bare element selector, optionally with pseudo-classes, e.g. `button`, `.card > a:hover`.
 * Compounds qualified with a class, id or attribute (`div.box`, `.header`, `#main`) are not reported.
 */
const getElementTag = (selector: string) => {
  const withoutArguments = selector.replace(/\([^()]*\)/g, '()')
  const compound = withoutArguments.trim().split(/\s*[>+~]\s*|\s+/).pop() ?? ''
  if (/[.#[]/.test(compound)) {
    return undefined
  }
  const tag = compound.match(/^[a-z][a-z0-9]*/i)?.[0].toLowerCase()
  return tag && htmlTags.includes(tag as HtmlTags)
    ? tag
    : undefined
}

const checkElementSelectorsWithScoped = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles) {
    return
  }

  styles.filter(style => style.scoped).forEach((style) => {
    const css = style.content.replace(/\/\*[\s\S]*?\*\//g, '')
    for (const [, prelude] of css.matchAll(selectorPreludeRegex)) {
      const selectorList = prelude.trim()
      if (selectorList.startsWith('@')) {
        continue
      }
      selectorList.split(',').forEach((selector) => {
        const tag = getElementTag(selector)
        if (tag) {
          results.push({ filePath, message: `<bg_warn>(${tag})</bg_warn>` })
        }
      })
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

export { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped }
