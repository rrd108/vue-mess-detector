import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR } from '../asceeCodes'

const vforNoKeyFiles: { filePath: string }[] = []

const checkVforNoKey = (template: SFCTemplateBlock, filePath: string) => {
  const regex = /<[^>]+ v-for[^>]+>/gi
  const matches = template.content.match(regex)

  if (matches?.length) {
    const hasKey = matches.some(match => match.includes(':key'))
    if (!hasKey) {
      vforNoKeyFiles.push({ filePath })
    }
  }
}

const reportVforNoKey = () => {
  if (vforNoKeyFiles.length > 0) {
    console.log(`\n${BG_ERR}v-for has no key${BG_RESET} in ${vforNoKeyFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Add a \`:key\` property to all v-for.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
    )
    vforNoKeyFiles.forEach(file => {
      console.log(`- ${file.filePath} 🚨`)
    })
  }
  return vforNoKeyFiles.length
}

export { checkVforNoKey, reportVforNoKey }
