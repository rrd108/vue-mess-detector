import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, maybe, oneOrMore, wordBoundary, wordChar } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []
const cssProperties: Map<string, { lineNumber: number, filePath: string }[]> = new Map()

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

    let from = 0
    matches?.forEach((match) => {
      const cssValue = match.replaceAll(' ', '')
      const lineNumber = getLineNumber(content, match, from)
      from = lineNumber

      if (!cssProperties.has(cssValue)) {
        cssProperties.set(cssValue, [{ lineNumber, filePath }])
        return
      }

      cssProperties.get(cssValue)?.push({ lineNumber, filePath })
    })
  })

  cssProperties.forEach((value, key) => {
    if (value.length > 3) {
      value.forEach((item) => {
        results.push({
          filePath: `${item.filePath}`,
          message: `Repeated CSS: ${key} in line #${item.lineNumber}`,
        })
      })
    }
  })
}

const reportRepeatedCss = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  return offenses
}

export { checkRepeatedCss, reportRepeatedCss, resetResults }
