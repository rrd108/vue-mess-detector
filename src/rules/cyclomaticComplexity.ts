import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_INFO, BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, BG_ERR } from '../asceeCodes'

/**
 * Defines complexity thresholds.
 */
const COMPLEXITY_MODERATE = 5
const COMPLEXITY_HIGH = 10

/**
 * Array to store files with medium or high cyclomatic complexity.
 */
const cyclomaticComplexityFiles: { fileName: string; cyclomaticComplexity: number }[] = []

/**
 * Function to check cyclomatic complexity of a SFC script block.
 *
 * @param {SFCScriptBlock} script - The SFC script block to analyze.
 * @param {string} file - The filename of the SFC.
 */
const checkCyclomaticComplexity = (script: SFCScriptBlock, file: string) => {
  const _if = /\bif\b/gi
  const _else = /\belse\b/gi
  const _for = /\bfor\b/gi
  const _while = /\bwhile\b/gi
  const _case = /\bcase\b/gi

  const _ifCount = script.content.match(_if)
  const _elseCount = script.content.match(_else)
  const _forCount = script.content.match(_for)
  const _whileCount = script.content.match(_while)
  const _caseCount = script.content.match(_case)

  const cyclomaticComplexity =
    (_ifCount?.length || 0) +
    (_elseCount?.length || 0) +
    (_forCount?.length || 0) +
    (_whileCount?.length || 0) +
    (_caseCount?.length || 0)

  if (cyclomaticComplexity > COMPLEXITY_MODERATE) {
    cyclomaticComplexityFiles.push({ fileName: file, cyclomaticComplexity })
  }
}

/**
 * Function to report files with medium or high cyclomatic complexity.
 *
 * @returns {number} The number of files with high cyclomatic complexity.
 */
const reportCyclomaticComplexity = () => {
  if (cyclomaticComplexityFiles.length > 0) {
    console.log(
      `\n${BG_INFO}cyclomaticComplexity${BG_RESET} is above moderate in ${cyclomaticComplexityFiles.length} files.`
    )
    console.log(`👉 ${TEXT_WARN}Try to reduce complexity.${TEXT_RESET}`)
    cyclomaticComplexityFiles.forEach(file => {
      console.log(
        `- ${file.fileName} ${file.cyclomaticComplexity > COMPLEXITY_HIGH ? BG_ERR : BG_WARN}(${
          file.cyclomaticComplexity
        })${BG_RESET}`
      )
    })
  }
  return cyclomaticComplexityFiles.length
}

export { checkCyclomaticComplexity, reportCyclomaticComplexity }
