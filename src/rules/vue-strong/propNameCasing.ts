import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO } from '../asceeCodes'
import { global, charNotIn, createRegExp, letter, oneOrMore } from 'magic-regexp'

const propNameCasingFiles: { filePath: string }[] = []

const camelCasePattern = createRegExp(
  oneOrMore(letter.lowercase).at.lineStart(),
  oneOrMore(letter.uppercase, letter.lowercase.times.any().grouped()).at.lineEnd()
)

const checkPropNameCasing = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = /defineProps\({([^}]+)/g
  let match
  while ((match = regex.exec(script.content)) !== null) {
    const propNames = match[1]
      .replace(/\s+/g, '')
      .replace(/["']/g, '')
      .split(',')
      .map(prop => prop.split(':')[0])
      .filter(prop => prop.length)
      .filter(prop => !camelCasePattern.test(prop))

    if (propNames.length) {
      propNameCasingFiles.push({ filePath })
    }
  }
}

const reportPropNameCasing = () => {
  if (propNameCasingFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}prop names are not camelCased${BG_RESET} in ${propNameCasingFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Rename the props to camelCase.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
    )
    propNameCasingFiles.forEach(file => {
      console.log(`- ${file.filePath} 🚨`)
    })
  }
  return propNameCasingFiles.length
}

export { checkPropNameCasing, reportPropNameCasing }
