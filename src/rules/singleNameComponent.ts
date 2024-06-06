import path from 'path'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR } from '../asceeCodes'

const singleNameComponentFiles: { filePath: string }[] = []

const checkSingleNameComponent = (filePath: string) => {
  // in the pages directory this rule does not apply
  if (filePath.includes('pages')) {
    return
  }

  const fileName = path.basename(filePath)
  if (fileName === 'App.vue') return

  const regex = /[A-Z]/
  const matches = fileName.slice(1).match(regex) // ignore the first character

  if (!matches?.length) {
    singleNameComponentFiles.push({ filePath })
  }
}

const reportSingleNameComponent = () => {
  if (singleNameComponentFiles.length > 0) {
    console.log(`\n${BG_ERR}single name component${BG_RESET} is used in ${singleNameComponentFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Rename the component to use multi-word name.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
    )
    singleNameComponentFiles.forEach(file => {
      console.log(`- ${BG_ERR}${file.fileName}${BG_RESET}`)
    })
  }
  return singleNameComponentFiles.length
}

export { checkSingleNameComponent, reportSingleNameComponent }
