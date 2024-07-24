import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO } from '../asceeCodes'
import { caseInsensitive, charNotIn, createRegExp, global, oneOrMore } from 'magic-regexp'

const vifWithVforFiles: { filePath: string }[] = []

const checkVifWithVfor = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }
  const regex1 = createRegExp(
    '<',
    oneOrMore(charNotIn('>')),
    ' v-if',
    oneOrMore(charNotIn('>')),
    ' v-for',
    oneOrMore(charNotIn('>')),
    '>',
    [global, caseInsensitive]
  )
  const regex2 = createRegExp(
    '<',
    oneOrMore(charNotIn('>')),
    ' v-for',
    oneOrMore(charNotIn('>')),
    ' v-if',
    oneOrMore(charNotIn('>')),
    '>',
    [global, caseInsensitive]
  )
  const matches1 = template.content.match(regex1)
  const matches2 = template.content.match(regex2)

  if (matches1?.length || matches2?.length) {
    vifWithVforFiles.push({ filePath })
  }
}

const reportVifWithVfor = () => {
  if (vifWithVforFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-essential${TEXT_RESET} ${BG_ERR}v-if used with v-for${BG_RESET} in ${vifWithVforFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Move out the v-if to a computed property.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
    )
    vifWithVforFiles.forEach(file => {
      console.log(`- ${file.filePath} 🚨`)
    })
  }
  return vifWithVforFiles.length
}

export { checkVifWithVfor, reportVifWithVfor }
