import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR } from '../asceeCodes'

const simplePropFiles: { filePath: string }[] = []

const checkSimpleProp = (script: SFCScriptBlock, filePath: string) => {
  const regex = /defineProps\(\[/gi
  const matches = script.content.match(regex)

  if (matches?.length) {
    simplePropFiles.push({ filePath })
  }
}

const reportSimpleProp = () => {
  if (simplePropFiles.length > 0) {
    console.log(`\n${BG_ERR}simple prop${BG_RESET} is used in ${simplePropFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Add at least type definition.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
    )
    simplePropFiles.forEach(file => {
      console.log(`- ${BG_ERR}${file.fileName}${BG_RESET}`)
    })
  }
  return simplePropFiles.length
}

export { checkSimpleProp, reportSimpleProp }
