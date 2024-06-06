import { SFCStyleBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_RESET, TEXT_WARN } from '../asceeCodes'

const globalStyleFiles: { filePath: string }[] = []

const checkGlobalStyle = (style: SFCStyleBlock, filePath: string) => {
  if (!style.scoped) {
    globalStyleFiles.push({ filePath })
  }
}

const reportGlobalStyle = () => {
  if (globalStyleFiles.length > 0) {
    console.log(`\n${BG_ERR}Global style ${BG_RESET} is used in ${globalStyleFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Use <style scoped>.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
    )
    globalStyleFiles.forEach(file => {
      console.log(`- ${BG_ERR}${file.fileName}${BG_RESET}`)
    })
  }
  return globalStyleFiles.length
}

export { checkGlobalStyle, reportGlobalStyle }
