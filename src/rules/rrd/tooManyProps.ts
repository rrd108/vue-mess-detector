import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from '../asceeCodes'
import { char, charNotIn, createRegExp, exactly, maybe, oneOrMore, whitespace } from 'magic-regexp'

const tooManyPropsFiles: { fileName: string; propsCount: number }[] = []
const TOO_MANY_PROPS = 5

const checkTooManyProps = (script: SFCScriptBlock, file: string) => {
  const regex = createRegExp('defineProps', maybe('<'), maybe('('), '{', oneOrMore(char), '}', ['g', 's'])
  const matches = script.content.match(regex)
  if (matches?.length) {
    const propsCount = matches[0].split(',').length
    if (propsCount > TOO_MANY_PROPS) {
      tooManyPropsFiles.push({ fileName: file, propsCount: propsCount })
    }
  }
}

const reportTooManyProps = () => {
  if (tooManyPropsFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}rrd${TEXT_RESET} ${BG_WARN}too many props${BG_RESET} are used in ${tooManyPropsFiles.length} files.`
    )
    console.log(`👉 ${TEXT_WARN}Try to refactor your code to use less properties.${TEXT_RESET}`)
    tooManyPropsFiles.forEach(file => {
      console.log(`- ${file.fileName} ${BG_WARN}(${file.propsCount})${BG_RESET}`)
    })
  }
  return tooManyPropsFiles.length
}

export { checkTooManyProps, reportTooManyProps }
