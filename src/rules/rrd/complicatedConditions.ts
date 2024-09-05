import type { SFCDescriptor } from '@vue/compiler-sfc'
import { anyOf, char, charNotIn, createRegExp, global, oneOrMore } from 'magic-regexp'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const WARNING_THRESHOLD = 4
const ERROR_THRESHOLD = 2 * WARNING_THRESHOLD

const checkComplicatedConditions = (descriptor: SFCDescriptor, filePath: string) => {
  const { script, template } = descriptor
  if (!script && !template) {
    return
  }

  const conditionalRegex = createRegExp(
    anyOf(
      'if',
      'v-if="',
      oneOrMore(char).groupedAs('condition').and('?').and(oneOrMore(char)).and(':'), // ternary
      '=',
    ).and(
      oneOrMore(
        anyOf(
          '&&',
          '||',
          charNotIn('"\''),
        ),
      ),
    ),
    [global],
  )

  const conditionSeparatorRegex = createRegExp(
    anyOf('&&', '||'),
    [global],
  )

  const checkContent = (content: string, type: 'script' | 'template') => {
    const matches = content.match(conditionalRegex)
    if (matches) {
      matches.forEach((match) => {
        const conditionBlocks = (match.match(conditionSeparatorRegex) || []).length + 1
        if (conditionBlocks > WARNING_THRESHOLD) {
          const lineNumber = getLineNumber(content, match)
          results.push({
            filePath,
            message: `line #${lineNumber} ${conditionBlocks > ERROR_THRESHOLD ? BG_ERR : BG_WARN}${type} has a complicated condition with ${conditionBlocks} blocks${BG_RESET}`,
          })
        }
      })
    }
  }

  if (script) {
    checkContent(script.content, 'script')
  }

  if (template) {
    checkContent(template.content, 'template')
  }
}

const reportComplicatedConditions = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ complicated conditions${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Simplify complex conditions by breaking them down into smaller, more manageable parts.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetComplicatedConditions = () => (results.length = 0)

export { checkComplicatedConditions, reportComplicatedConditions, resetComplicatedConditions }
