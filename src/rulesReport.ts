import type { GroupBy, Health, Offense, OffensesGrouped, OutputLevel, ReportFunction, SortBy } from './types'
import type { OutputType } from './types/OutputType'
import type { OverrideConfig } from './types/Override'
import { overrideConfig } from '.'
import { reportApiWithoutMethod, reportBigVif, reportBigVshow, reportComplicatedConditions, reportComputedSideEffects, reportCyclomaticComplexity, reportDeepIndentation, reportElseCondition, reportFunctionSize, reportHtmlImageElements, reportHtmlLink, reportIfWithoutCurlyBraces, reportMagicNumbers, reportNestedTernary, reportNoInlineStyles, reportNoPropDestructure, reportNoVarDeclaration, reportParameterCount, reportPlainScript, reportPropsDrilling, reportScriptLength, reportShortVariableName, reportTooManyProps, reportVForWithIndexKey, reportZeroLengthComparison } from './rules/rrd'
import { reportElementSelectorsWithScoped, reportImplicitParentChildCommunication } from './rules/vue-caution'
import { reportGlobalStyle, reportSimpleProp, reportSingleNameComponent, reportVforNoKey, reportVifWithVfor } from './rules/vue-essential'
import { reportElementAttributeOrder, reportTopLevelElementOrder } from './rules/vue-recommended'
import { reportComponentFilenameCasing, reportComponentFiles, reportDirectiveShorthands, reportFullWordComponentName, reportMultiAttributeElements, reportPropNameCasing, reportQuotedAttributeValues, reportSelfClosingComponents, reportSimpleComputed, reportTemplateSimpleExpression } from './rules/vue-strong'

export const reportRules = (groupBy: GroupBy, sortBy: SortBy, level: OutputLevel) => {
  const offensesGrouped: OffensesGrouped = {}
  const output: OutputType = {}
  const health: Health[] = []

  const { ...limits } = overrideConfig[0] as OverrideConfig

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
  processOffenses(reportApiWithoutMethod)
  processOffenses(reportBigVif)
  processOffenses(reportBigVshow)
  processOffenses(reportComplicatedConditions)
  processOffenses(reportCyclomaticComplexity)
  processOffenses(reportComputedSideEffects)
  processOffenses(reportDeepIndentation)
  processOffenses(reportElseCondition)
  processOffenses(() => reportFunctionSize(limits.maxFunctionSize))
  processOffenses(reportHtmlImageElements)
  processOffenses(reportHtmlLink)
  processOffenses(reportIfWithoutCurlyBraces)
  processOffenses(reportMagicNumbers)
  processOffenses(reportNestedTernary)
  processOffenses(reportNoPropDestructure)
  processOffenses(reportNoVarDeclaration)
  processOffenses(reportParameterCount)
  processOffenses(reportPlainScript)
  processOffenses(reportPropsDrilling)
  processOffenses(() => reportScriptLength(limits.maxScriptLength))
  processOffenses(reportShortVariableName)
  processOffenses(reportTooManyProps)
  processOffenses(reportVForWithIndexKey)
  processOffenses(reportZeroLengthComparison)
  processOffenses(reportNoInlineStyles)

  // Sort offenses grouped by key based on the `sortBy` parameter
  const sortedKeys = Object.keys(offensesGrouped).sort((a, b) => {
    const countA = offensesGrouped[a].length
    const countB = offensesGrouped[b].length

    if (sortBy === 'desc') {
      return countB - countA
    }

    return countA - countB
  })

  sortedKeys.forEach((key) => {
    output[key] = []

    offensesGrouped[key].forEach((offense, i) => {
      const isError = offense.message.includes('<bg_err>')
      // if health already has the file, push the error
      if (health.some(h => h.file === offense.file)) {
        const foundHealth = health.find(h => h.file === offense.file)
        if (foundHealth) {
          isError ? foundHealth.errors++ : foundHealth.warnings++
        }
      }
      else {
        health.push({ file: offense.file, errors: isError ? 1 : 0, warnings: isError ? 0 : 1, output: [] })
      }

      if (level === 'error' && !isError) {
        return
      }

      output[key][i] = { id: '', description: '', message: '' }

      if (groupBy === 'file') {
        output[key][i].id = offense.rule
      }

      if (groupBy !== 'file') {
        output[key][i].id = offense.file
      }
      output[key][i].description = offense.description
      output[key][i].message = offense.message || '🚨'
    })
  })

  return { output, health }
}
