import path from 'node:path'
import { createRegExp, letter } from 'magic-regexp'
import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const singleNameComponentFiles: { filePath: string }[] = []

const checkSingleNameComponent = (filePath: string) => {
  // in the pages directory this rule does not apply
  if (filePath.includes('pages')) {
    return
  }

  const fileName = path.basename(filePath)
  if (fileName === 'App.vue')
    return

  const regex = createRegExp(letter.uppercase)
  const matches = fileName.slice(1).match(regex) // ignore the first character

  if (!matches?.length) {
    singleNameComponentFiles.push({ filePath })
  }
}

const reportSingleNameComponent = () => {
  const offenses: Offense[] = []

  if (singleNameComponentFiles.length > 0) {
    singleNameComponentFiles.forEach((file) => {
      offenses.push({
        file: file.filePath,
        rule: `${TEXT_INFO}vue-essential ~ single name component${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Rename the component to use multi-word name.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`,
        message: `🚨`,
      })
    })
  }
  return offenses
}

const resetSingleNameComponent = () => (singleNameComponentFiles.length = 0)

export { checkSingleNameComponent, reportSingleNameComponent, resetSingleNameComponent }
