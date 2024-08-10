import { charIn, charNotIn, createRegExp, exactly, global, oneOrMore } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const MINIMAL_CONSONANTS = 3

const checkFullWordComponentName = (filePath: string) => {
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

    if (!consonantsMatch || consonantsMatch.length < MINIMAL_CONSONANTS) {
      results.push({ filePath, message: `${filename} is not a ${BG_WARN}full word.${BG_RESET}` })
    }
  }
}

const reportFullWordComponentName = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-strong ~ full-word component names${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Component names should prefer full words over abbreviations.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetFullWordComponentName = () => (results.length = 0)

export { checkFullWordComponentName, reportFullWordComponentName, resetFullWordComponentName }
