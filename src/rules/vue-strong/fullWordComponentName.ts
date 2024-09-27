import type { FileCheckResult, Offense } from '../../types'
import path from 'node:path'
import { charIn, createRegExp, global } from 'magic-regexp'
import { IGNORE_NAME_RULES } from '../../helpers/constants'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkFullWordComponentName = (filePath: string, minimumConsonantCount: number) => {
  const fileName = path.basename(filePath)

  if (IGNORE_NAME_RULES.includes(fileName.toLowerCase())) {
    return
  }

  const splittedFileName = fileName?.split('.vue')[0] as string

  // Check for filenames inside square brackets (e.g. [id].vue)
  if (fileName.startsWith('[') && fileName.endsWith('].vue')) {
    return
  }

  // regular expression to match and count consonants
  const consonantsRegex = createRegExp(
    charIn('bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'),
    [global],
  )

  const consonantsMatch = splittedFileName.match(consonantsRegex)

  if (!consonantsMatch || consonantsMatch.length < minimumConsonantCount) {
    results.push({ filePath, message: `${splittedFileName} is not a <bg_warn>full word.</bg_warn>` })
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

export { checkFullWordComponentName, reportFullWordComponentName }
