import type { GroupBy, Health, Offense, OffensesGrouped, OrderBy, OutputLevel, ReportFunction } from './types'
import { BG_ERR } from './rules/asceeCodes'

import { reportElementSelectorsWithScoped, reportImplicitParentChildCommunication } from './rules/vue-caution'
import { reportGlobalStyle, reportSimpleProp, reportSingleNameComponent, reportVforNoKey, reportVifWithVfor } from './rules/vue-essential'
import { reportElementAttributeOrder, reportTopLevelElementOrder } from './rules/vue-recommended'
import { reportComponentFilenameCasing, reportComponentFiles, reportDirectiveShorthands, reportFullWordComponentName, reportMultiAttributeElements, reportPropNameCasing, reportQuotedAttributeValues, reportSelfClosingComponents, reportSimpleComputed, reportTemplateSimpleExpression } from './rules/vue-strong'
import { reportCyclomaticComplexity, reportDeepIndentation, reportElseCondition, reportFunctionSize, reportHtmlLink, reportIfWithoutCurlyBraces, reportMagicNumbers, reportNestedTernary, reportNoPropDestructure, reportParameterCount, reportPlainScript, reportPropsDrilling, reportScriptLength, reportShortVariableName, reportTooManyProps, reportVForWithIndexKey, reportZeroLengthComparison } from './rules/rrd'

export const reportRules = (groupBy: GroupBy, orderBy: OrderBy, level: OutputLevel) => {
  const offensesGrouped: OffensesGrouped = {}

  // Helper function to add offenses
  const addOffense = ({ file, rule, title, description, message }: Offense) => {
    const groupKey = groupBy === 'rule' ? rule : file

    if (!offensesGrouped[groupKey]) {
      offensesGrouped[groupKey] = []
    }
    offensesGrouped[groupKey].push({ file, rule, title, description, message })
  }

  // Helper function to process offenses from a report function
  const processOffenses = (reportFunction: ReportFunction) => {
    const offenses = reportFunction()
    offenses.forEach((offense) => {
      addOffense(offense)
    })
  }

  // vue-essential rules
  processOffenses(reportSingleNameComponent)
  processOffenses(reportSimpleProp)
  processOffenses(reportVforNoKey)
  processOffenses(reportVifWithVfor)
  processOffenses(reportGlobalStyle)

  // vue-strong rules
  processOffenses(reportComponentFilenameCasing)
  processOffenses(reportComponentFiles)
  processOffenses(reportDirectiveShorthands)
  processOffenses(reportFullWordComponentName)
  processOffenses(reportMultiAttributeElements)
  processOffenses(reportPropNameCasing)
  processOffenses(reportQuotedAttributeValues)
  processOffenses(reportSelfClosingComponents)
  processOffenses(reportSimpleComputed)
  processOffenses(reportTemplateSimpleExpression)

  // vue-recommended rules
  processOffenses(reportTopLevelElementOrder)
  processOffenses(reportElementAttributeOrder)

  // vue-caution rules
  processOffenses(reportImplicitParentChildCommunication)
  processOffenses(reportElementSelectorsWithScoped)

  // rrd rules
  processOffenses(reportCyclomaticComplexity)
  processOffenses(reportDeepIndentation)
  processOffenses(reportElseCondition)
  processOffenses(reportFunctionSize)
  processOffenses(reportHtmlLink)
  processOffenses(reportIfWithoutCurlyBraces)
  processOffenses(reportMagicNumbers)
  processOffenses(reportNestedTernary)
  processOffenses(reportNoPropDestructure)
  processOffenses(reportParameterCount)
  processOffenses(reportPlainScript)
  processOffenses(reportPropsDrilling)
  processOffenses(reportScriptLength)
  processOffenses(reportShortVariableName)
  processOffenses(reportTooManyProps)
  processOffenses(reportVForWithIndexKey)
  processOffenses(reportZeroLengthComparison)

  const health: Health[] = []

  // Sort offenses grouped by key based on the `orderBy` parameter
  const sortedKeys = Object.keys(offensesGrouped).sort((a, b) => {
    const countA = offensesGrouped[a].length
    const countB = offensesGrouped[b].length

    if (orderBy === 'desc') {
      return countB - countA
    }

    return countA - countB
  })

  // Output the report grouped by the sorted keys
  const output: { info: string }[] = []

  sortedKeys.forEach((key) => {
    output.push({ info: `\n - ${key}` })

    offensesGrouped[key].forEach((offense) => {
      const isError = offense.message.includes(BG_ERR)
      // if health already has the file, push the error
      if (health.some(h => h.file === offense.file)) {
        const foundHealth = health.find(h => h.file === offense.file)
        if (foundHealth) {
          // eslint-disable-next-line ts/no-unused-expressions
          isError ? foundHealth.errors++ : foundHealth.warnings++
        }
      }
      else {
        health.push({ file: offense.file, errors: isError ? 1 : 0, warnings: isError ? 0 : 1 })
      }

      if (level === 'error' && !isError) {
        return
      }

      if (groupBy === 'file') {
        output.push({ info: `   Rule: ${offense.rule}` })
      }

      if (groupBy !== 'file') {
        output.push({ info: `   File: ${offense.file}` })
      }
      output.push({ info: `   Description: ${offense.description}` })
      output.push({ info: `   Message: ${offense.message || '🚨'}\n` })
    })
  })

  return { output, health }
}
