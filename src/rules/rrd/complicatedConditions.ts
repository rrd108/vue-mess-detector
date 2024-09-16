import { anyOf, char, charNotIn, createRegExp, global, oneOrMore } from 'magic-regexp'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { skipComments } from '../../helpers/skipComments'
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
    content = skipComments(content)
    const matches = content.match(conditionalRegex)
    if (matches) {
      matches.forEach((match) => {
        const conditionBlocks = (match.match(conditionSeparatorRegex) || []).length + 1
        if (conditionBlocks > WARNING_THRESHOLD) {
          const lineNumber = getLineNumber(content, match)
          results.push({
            filePath,
            message: `line #${lineNumber} ${conditionBlocks > ERROR_THRESHOLD ? '<bg_err>' : '<bg_warn>'}${type} has a complicated condition with ${conditionBlocks} blocks${conditionBlocks > ERROR_THRESHOLD ? '</bg_err>' : '</bg_warn>'}`,
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
        rule: `<text_info>rrd ~ complicated conditions</text_info>`,
        description: `👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetComplicatedConditions = () => (results.length = 0)

export { checkComplicatedConditions, reportComplicatedConditions, resetComplicatedConditions }
