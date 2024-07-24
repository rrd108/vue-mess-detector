import path from 'path'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO } from '../asceeCodes'
import { createRegExp, letter } from 'magic-regexp'

const singleNameComponentFiles: { filePath: string }[] = []

const checkSingleNameComponent = (filePath: string) => {
  // in the pages directory this rule does not apply
  if (filePath.includes('pages')) {
    return
  }

  const fileName = path.basename(filePath)
  if (fileName === 'App.vue') return

  const regex = createRegExp(letter.uppercase)
  const matches = fileName.slice(1).match(regex) // ignore the first character

  if (!matches?.length) {
    singleNameComponentFiles.push({ filePath })
  }
}

const reportSingleNameComponent = () => {
  if (singleNameComponentFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-essential${TEXT_RESET} ${BG_ERR}single name component${BG_RESET} is used in ${singleNameComponentFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Rename the component to use multi-word name.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
    )
    singleNameComponentFiles.forEach(file => {
      console.log(`- ${file.filePath} 🚨`)
    })
  }
  return singleNameComponentFiles.length
}

export { checkSingleNameComponent, reportSingleNameComponent }
