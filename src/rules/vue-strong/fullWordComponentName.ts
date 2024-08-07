import { charIn, charNotIn, createRegExp, exactly, global, oneOrMore } from 'magic-regexp'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { getUniqueFilenameCount } from '../../helpers'
import type { Offense } from '../../types'

interface FullWordComponentNames { filename: string, filePath: string }

const fullWordComponentNames: FullWordComponentNames[] = []
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
      fullWordComponentNames.push({ filename, filePath })
    }
  }
}

const reportFullWordComponentName = () => {
  const offenses: Offense[] = []

  if (fullWordComponentNames.length > 0) {
    fullWordComponentNames.forEach((file) => {
      offenses.push({
        file: file.filePath,
        rule: `${BG_WARN}vue-strong ~ full-word component names${BG_RESET}`,
        title: '',
        description: `👉 ${TEXT_WARN}Component names should prefer full words over abbreviations.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`,
        message: `${BG_WARN}(${file.filename})${BG_RESET} 🚨`,
      })
    })
  }
  return offenses
}

export { checkFullWordComponentName, reportFullWordComponentName }
