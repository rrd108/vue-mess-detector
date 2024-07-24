import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from '../asceeCodes'
import { caseInsensitive, createRegExp, global, tab, whitespace } from 'magic-regexp'

const deepIndentationFiles: { fileName: string; elseCount: number }[] = []
const MAX_TABS = 5
const WHITESPACE_TO_TABS = 3

const checkDeepIndentation = (script: SFCScriptBlock | null, file: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(tab.times.atLeast(MAX_TABS).or(whitespace.times.atLeast(WHITESPACE_TO_TABS * MAX_TABS)), [
    global,
    caseInsensitive,
  ])
  const matches = script.content.match(regex)

  if (matches?.length) {
    deepIndentationFiles.push({ fileName: file, elseCount: matches.length })
  }
}

const reportDeepIndentation = () => {
  if (deepIndentationFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}rrd${TEXT_RESET} ${BG_WARN}deep indentation${BG_RESET} found in ${deepIndentationFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Try to refactor your component to child components, to avoid deep indentations..${TEXT_RESET}`
    )
    deepIndentationFiles.forEach(file => {
      console.log(`- ${file.fileName} ${BG_WARN}(${file.elseCount})${BG_RESET}`)
    })
  }
  return deepIndentationFiles.length
}

export { checkDeepIndentation, reportDeepIndentation }
