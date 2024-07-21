import { SFCScriptBlock } from "@vue/compiler-sfc";
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO, BG_ERR } from '../asceeCodes'
import { getUniqueFilenameCount } from "../../helpers";
import getLineNumber from "../getLineNumber";

type ComponentFiles = { filename: string, message: string };

const componentFiles: ComponentFiles[] = [];

const checkComponentFiles = (script: SFCScriptBlock, filePath: string) => {
  // regular expression to match `.component('anyString', { ... })` pattern
  const regex = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;

  const matches = [...script.content.matchAll(regex)].map(match => match[1].trim());

  matches.forEach(match => {
    const lineNumber = getLineNumber(script.content.trim(), match);
    const firstPart = match.split('\n').at(0)?.trim() || ''
    componentFiles.push({ filename: filePath, message: `${filePath}#${lineNumber} ${BG_WARN}(${firstPart})${BG_RESET}` })
  })
}

const reportComponentFiles = () => {
  if (componentFiles.length > 0) {
    // count only non duplicated objects (by its `filename` property)
    const fileCount = getUniqueFilenameCount<ComponentFiles>(componentFiles, 'filename');

    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}component files${BG_RESET} detected in ${fileCount} files.`
    )
    console.log(`👉 ${TEXT_WARN}Whenever a build system is available to concatenate files, each component should be in its own file.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`)
    componentFiles.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return componentFiles.length;
}

export { checkComponentFiles, reportComponentFiles };