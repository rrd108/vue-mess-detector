import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR } from '../asceeCodes'

const vifWithVforFiles: { filePath: string }[] = []

const checkVifWithVfor = (template: SFCTemplateBlock, filePath: string) => {
  const regex1 = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi
  const regex2 = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi
  const matches1 = template.content.match(regex1)
  const matches2 = template.content.match(regex2)

  if (matches1?.length || matches2?.length) {
    vifWithVforFiles.push({ filePath })
  }
}

const reportVifWithVfor = () => {
  if (vifWithVforFiles.length > 0) {
    console.log(`\n${BG_ERR}v-if used with v-for${BG_RESET} in ${vifWithVforFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Move out the v-if to a computed property.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
    )
    vifWithVforFiles.forEach(file => {
      console.log(`- ${BG_ERR}${file.fileName}${BG_RESET}`)
    })
  }
  return vifWithVforFiles.length
}

export { checkVifWithVfor, reportVifWithVfor }
