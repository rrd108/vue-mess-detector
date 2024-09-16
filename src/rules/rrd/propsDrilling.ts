/* eslint-disable no-cond-assign */
import { charIn, charNotIn, createRegExp, global, maybe, oneOrMore, whitespace, wordChar } from 'magic-regexp'
import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkPropsDrilling = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  // Matches `defineProps(['prop1', 'prop2', ...])` and extracts the prop names
  const regexDefineProps = createRegExp(
    'defineProps(',
    whitespace.times.any(),
    '[',
    whitespace.times.any(),
    oneOrMore(charIn('\'"'), oneOrMore(wordChar), charIn('\'"'), whitespace.times.any(), maybe(',', whitespace.times.any())),
    ']',
    whitespace.times.any(),
    ')',
    [global],
  )

  // Matches props usage in child components, e.g., `<ChildComponent :prop="props.prop" />`
  const regexPropUsage = createRegExp(
    '<',
    oneOrMore(wordChar).grouped(),
    whitespace,
    charNotIn('>').times.any(),
    ':',
    oneOrMore(wordChar).grouped(),
    whitespace.times.any(),
    '=',
    whitespace.times.any(),
    '"props.',
    oneOrMore(wordChar).grouped(),
    '"',
    [global],
  )

  let matchProps
  const props = new Set<string>()

  // Extract props defined in the component
  while ((matchProps = regexDefineProps.exec(script.content)) !== null) {
    const propList = matchProps[0]
      .replace(/defineProps\(|[)[\]'"\s]/g, '') // Clean up the matched string to extract prop names
      .split(',')
    propList.forEach(prop => props.add(prop))
  }

  let matchUsage

  // Check if props are forwarded to child components unmodified
  while ((matchUsage = regexPropUsage.exec(script.content)) !== null) {
    const childComponent = matchUsage[1]
    const childProp = matchUsage[2]
    const parentProp = matchUsage[3]

    if (props.has(parentProp) && childProp === parentProp) {
      results.push({
        filePath,
        message: `Prop <bg_warn>(${parentProp})</bg_warn> is being drilled through <bg_warn>${childComponent}</bg_warn> component unmodified.`,
      })
    }
  }
}

const reportPropsDrilling = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ props drilling</text_info>`,
        description: `👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetPropsDrilling = () => (results.length = 0)

export { checkPropsDrilling, reportPropsDrilling, resetPropsDrilling }
