import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import { getUniqueFilenameCount } from '../../helpers'

type ImplicitParentChildCommunicationFile = { filename: string; message: string }

const implicitParentChildCommunicationFiles: ImplicitParentChildCommunicationFile[] = []

const checkImplicitParentChildCommunication = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const propsRegex = /defineProps\(([^)]+)\)/
  const vModelRegex = /v-model\s*=\s*"([^"]+)"/
  const parentRegex = /\$parent|getCurrentInstance/g

  // Extract defined props
  const propsMatch = script.content.match(propsRegex)

  // Check for props mutation
  const vModelMatch = script.content.match(vModelRegex)
  if (vModelMatch) {
    const vModelProp = vModelMatch[1].split('.')[0]
    const definedProps = propsMatch ? propsMatch[1] : ''

    // Check if matched prop is inside `v-model` directive
    if (definedProps.includes(vModelProp)) {
      const lineNumber = getLineNumber(script.content.trim(), definedProps)
      implicitParentChildCommunicationFiles.push({
        filename: filePath,
        message: `${filePath}#${lineNumber} ${BG_WARN}(${vModelProp})${BG_RESET}`,
      })
    }
  }

  // Check for $parent / getCurrentInstance
  const parentMatch = script.content.match(parentRegex)
  if (parentMatch) {
    const lineNumber = getLineNumber(script.content.trim(), parentMatch[0])
    implicitParentChildCommunicationFiles.push({
      filename: filePath,
      message: `${filePath}#${lineNumber} ${BG_WARN}(${parentMatch[0]})${BG_RESET}`,
    })
  }
}

const reportImplicitParentChildCommunication = () => {
  if (implicitParentChildCommunicationFiles.length > 0) {
    // Count only non duplicated objects (by its `filename` property)
    const fileCount = getUniqueFilenameCount<ImplicitParentChildCommunicationFile>(
      implicitParentChildCommunicationFiles,
      'filename'
    )

    console.log(
      `\n${TEXT_INFO}vue-caution${TEXT_RESET} ${BG_WARN}implicit parent-child communication${BG_RESET} detected in ${fileCount} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`
    )
    implicitParentChildCommunicationFiles.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return implicitParentChildCommunicationFiles.length
}

export { checkImplicitParentChildCommunication, reportImplicitParentChildCommunication }
