import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { char, createRegExp, maybe, oneOrMore } from 'magic-regexp'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const tooManyPropsFiles: { fileName: string, propsCount: number }[] = []
const TOO_MANY_PROPS = 5

const checkTooManyProps = (script: SFCScriptBlock | null, file: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp('defineProps', maybe('<'), maybe('('), '{', oneOrMore(char), '}', ['g', 's'])
  const matches = script.content.match(regex)
  if (matches?.length) {
    const propsCount = matches[0].split(',').length
    if (propsCount > TOO_MANY_PROPS) {
      tooManyPropsFiles.push({ fileName: file, propsCount })
    }
  }
}

const reportTooManyProps = () => {
  const offenses: Offense[] = []

  if (tooManyPropsFiles.length > 0) {
    tooManyPropsFiles.forEach((file) => {
      offenses.push({
        file: file.fileName,
        rule: `${TEXT_INFO}rrd ~ too many props${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Try to refactor your code to use less properties.${TEXT_RESET}`,
        message: `props found ${BG_ERR}(${file.propsCount})${BG_RESET} 🚨`,
      })
    })
  }
  return offenses
}

export { checkTooManyProps, reportTooManyProps }
