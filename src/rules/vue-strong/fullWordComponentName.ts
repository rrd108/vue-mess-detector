import type { FileCheckResult, Offense } from '../../types'

import { charIn, charNotIn, createRegExp, exactly, global, oneOrMore } from 'magic-regexp'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkFullWordComponentName = (filePath: string, minimumConsonantCount: number) => {
  // regular expression to match `filename.vue` pattern
  const regex = createRegExp(
    oneOrMore(charNotIn('/')).grouped(),
    exactly('.vue').at.lineEnd(),
  )

  const match = filePath.match(regex)

  if (match) {
    const filename = match[0]?.split('.vue')[0] as string

    // regular expression to match and count consonants
    const consonantsRegex = createRegExp(
      charIn('bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'),
      [global],
    )

    const consonantsMatch = filename.match(consonantsRegex)

    if (!consonantsMatch || consonantsMatch.length < minimumConsonantCount) {
      results.push({ filePath, message: `${filename} is not a <bg_warn>full word.</bg_warn>` })
    }
  }
}

const reportFullWordComponentName = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ full-word component names</text_info>`,
        description: `👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkFullWordComponentName, reportFullWordComponentName, resetResults }
