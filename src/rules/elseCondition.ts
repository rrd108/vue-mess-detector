import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET } from '../asceeCodes'

const elseConditionFiles: { fileName: string; elseCount: number }[] = []

const checkElseCondition = (script: SFCScriptBlock, file: string) => {
  const regex = /\belse\b/gi
  const matches = script.content.match(regex)

  if (matches?.length) {
    elseConditionFiles.push({ fileName: file, elseCount: matches.length })
  }
}

const reportElseCondition = () => {
  if (elseConditionFiles.length > 0) {
    console.log(`\n${BG_WARN}else conditions${BG_RESET} are used in ${elseConditionFiles.length} files.`)
    console.log(`👉 ${TEXT_WARN}Try to rewrite the conditions in a way that the else clause is not necessary.${TEXT_RESET}`)
    elseConditionFiles.forEach(file => {
      console.log(`- ${file.fileName} ${BG_WARN}(${file.elseCount})${BG_RESET}`)
    })
  }
  return elseConditionFiles.length
}

export { checkElseCondition, reportElseCondition }
