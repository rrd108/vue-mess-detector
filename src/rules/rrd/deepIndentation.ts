import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from '../asceeCodes'
import { caseInsensitive, createRegExp, global, tab, whitespace } from 'magic-regexp'
import getLineNumber from '../getLineNumber'
import { getUniqueFilenameCount } from '../../helpers'

type DeepIndentationFile = {
  filePath: string
  message: string
}
const deepIndentationFiles: DeepIndentationFile[] = []
const MAX_TABS = 5
const WHITESPACE_TO_TABS = 3

const checkDeepIndentation = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(tab.times.atLeast(MAX_TABS).or(whitespace.times.atLeast(WHITESPACE_TO_TABS * MAX_TABS)), [
    global,
    caseInsensitive,
  ])
  const matches = script.content.match(regex)

  matches?.forEach(match => {
    const lineNumber = getLineNumber(script.content, match)
    deepIndentationFiles.push({
      filePath,
      message: `${filePath}#${lineNumber} ${BG_WARN}indentation: ${match.length}${BG_RESET}`,
    })
  })
}

const reportDeepIndentation = () => {
  if (deepIndentationFiles.length > 0) {
    const fileCount = getUniqueFilenameCount<DeepIndentationFile>(deepIndentationFiles, 'filePath')

    console.log(`\n${TEXT_INFO}rrd${TEXT_RESET} ${BG_WARN}deep indentation${BG_RESET} found in ${fileCount} files.`)
    console.log(
      `👉 ${TEXT_WARN}Try to refactor your component to child components, to avoid deep indentations..${TEXT_RESET}`
    )
    deepIndentationFiles.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return deepIndentationFiles.length
}

export { checkDeepIndentation, reportDeepIndentation }
