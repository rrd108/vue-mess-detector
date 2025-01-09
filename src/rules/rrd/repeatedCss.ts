import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, maybe, oneOrMore, wordBoundary, wordChar } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'

const results: FileCheckResult[] = []
const cssProperties: Map<string, Set<string>> = new Map()

const resetResults = () => {
  results.length = 0
  cssProperties.clear()
}

const checkRepeatedCss = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles) {
    return
  }

  const propertyRegex = createRegExp(
    wordBoundary,
    oneOrMore(wordChar),
    maybe('-'),
    maybe(oneOrMore(wordChar)),
    maybe(' '),
    ':',
    maybe(' '),
    oneOrMore(wordChar),
    ';',
    ['g', 's'],
  )

  styles.forEach((style) => {
    const content = skipComments(style.content)
    const matches = content.match(propertyRegex)

    matches?.forEach((match) => {
      const cssValue = match.replaceAll(' ', '')

      if (!cssProperties.has(cssValue)) {
        cssProperties.set(cssValue, new Set([filePath]))
      }
      else {
        cssProperties.get(cssValue)?.add(filePath)
      }
    })
  })
}

const reportRepeatedCss = () => {
  const offenses: Offense[] = []

  cssProperties.forEach((files, cssValue) => {
    if (files.size > 3) {
      offenses.push({
        file: Array.from(files).join(', '),
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css.html`,
        message: `repeated CSS: (${cssValue}) in ${files.size} files 🚨`,
      })
    }
  })

  resetResults()
  return offenses
}

export { checkRepeatedCss, reportRepeatedCss, resetResults }
