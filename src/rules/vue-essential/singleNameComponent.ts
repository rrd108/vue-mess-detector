import path from 'node:path'
import { createRegExp, letter } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

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
    results.push({ filePath, message: `Component name is ${BG_WARN}single word${BG_RESET}` })
  }
}

const reportSingleNameComponent = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-essential ~ single name component${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Rename the component to use multi-word name.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetSingleNameComponent = () => (results.length = 0)

export { checkSingleNameComponent, reportSingleNameComponent, resetSingleNameComponent }
