import path from 'path'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO } from '../asceeCodes'

const componentFilenameCasingFiles: { fileName: string }[] = []

const checkComponentFilenameCasing = (filePath: string) => {
  if (filePath.includes('pages/') || filePath.includes('layouts/')) return

  const fileName = path.basename(filePath)

  const regexPascalCase = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/
  const matchesPascalCase = fileName.match(regexPascalCase)

  const regexKebabCase = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/
  const matchesKebabCase = fileName.match(regexKebabCase)

  if (!matchesPascalCase?.length && !matchesKebabCase?.length) {
    componentFilenameCasingFiles.push({ fileName: filePath })
  }
}

const reportComponentFilenameCasing = () => {
  if (componentFilenameCasingFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}component name is not PascalCase and not kebab-abse${BG_RESET} in ${componentFilenameCasingFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Rename the component to use PascalCase or kebab-case file name.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
    )
    componentFilenameCasingFiles.forEach(file => {
      console.log(`- ${BG_ERR}${file.fileName}${BG_RESET}`)
    })
  }
  return componentFilenameCasingFiles.length
}

const resetComponentFilenameCasing = () => (componentFilenameCasingFiles.length = 0)

export { checkComponentFilenameCasing, reportComponentFilenameCasing, resetComponentFilenameCasing }
