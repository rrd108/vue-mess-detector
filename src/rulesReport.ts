import { reportScriptLength } from './rules/rrd/scriptLength'
import { reportPlainScript } from './rules/rrd/plainScript'
import { reportElseCondition } from './rules/rrd/elseCondition'
import { reportCyclomaticComplexity } from './rules/rrd/cyclomaticComplexity'
import { reportSingleNameComponent } from './rules/vue-essential/singleNameComponent'
import { reportGlobalStyle } from './rules/vue-essential/globalStyle'
import { reportSimpleProp } from './rules/vue-essential/simpleProp'
import { reportVifWithVfor } from './rules/vue-essential/vifWithVfor'
import { reportVforNoKey } from './rules/vue-essential/vforNoKey'
import { reportComponentFilenameCasing } from './rules/vue-strong/componentFilenameCasing'
import { reportPropNameCasing } from './rules/vue-strong/propNameCasing'
import { reportTemplateSimpleExpression } from './rules/vue-strong/templateSimpleExpression'
import { reportQuotedAttributeValues } from './rules/vue-strong/quotedAttributeValues'
import { reportSelfClosingComponents } from './rules/vue-strong/selfClosingComponents'
import { reportDirectiveShorthands } from './rules/vue-strong/directiveShorthands'
import { reportFullWordComponentName } from './rules/vue-strong/fullWordComponentName'
import { reportTopLevelElementOrder } from './rules/vue-recommended/topLevelElementOrder'
import { reportElementAttributeOrder } from './rules/vue-recommended/elementAttributeOrder'
import { reportTooManyProps } from './rules/rrd/tooManyProps'
import { reportFunctionSize } from './rules/rrd/functionSize'
import { reportParameterCount } from './rules/rrd/parameterCount'
import { reportPropsDrilling } from './rules/rrd/propsDrilling'
import { reportShortVariableName } from './rules/rrd/shortVariableName'
import { reportSimpleComputed } from './rules/vue-strong/simpleComputed'
import { reportComponentFiles } from './rules/vue-strong/componentFiles'
import { reportImplicitParentChildCommunication } from './rules/vue-caution/implicitParentChildCommunication'
import { reportDeepIndentation } from './rules/rrd/deepIndentation'
import type { GroupBy, Health, Offense, OffensesGrouped, OrderBy, OutputLevel, ReportFunction } from './types'
import { reportHtmlLink } from './rules/rrd/htmlLink'
import { reportIfWithoutCurlyBraces } from './rules/rrd/ifWithoutCurlyBraces'
import { reportMagicNumbers } from './rules/rrd/magicNumbers'
import { reportMultiAttributeElements } from './rules/vue-strong/multiAttributeElements'
import { reportElementSelectorsWithScoped } from './rules/vue-caution/elementSelectorsWithScoped'
import { reportNestedTernary } from './rules/rrd/nestedTernary'
import { reportVForWithIndexKey } from './rules/rrd/vForWithIndexKey'
import { reportNoPropDestructure } from './rules/rrd/noPropDestructure'
import { BG_ERR } from './rules/asceeCodes'
import { reportZeroLengthComparison } from './rules/rrd/zeroLengthComparison'

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
    offenses.forEach(offense => {
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
  processOffenses(reportParameterCount)
  processOffenses(reportPlainScript)
  processOffenses(reportPropsDrilling)
  processOffenses(reportScriptLength)
  processOffenses(reportShortVariableName)
  processOffenses(reportTooManyProps)
  processOffenses(reportVForWithIndexKey)
  processOffenses(reportNoPropDestructure)
  processOffenses(reportZeroLengthComparison)
  
  const health: { file: string; errors: number; warnings: number }[] = []

  // Output the report grouped by file
  Object.keys(offensesGrouped).forEach(key => {
    console.log(`\n - ${key}`)
    offensesGrouped[key].forEach(offense => {

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
  sortedKeys.forEach((key) => {
    console.log(`\n - ${key}`)

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
        console.log(`   Rule: ${offense.rule}`)
      } else {
        console.log(`   File: ${offense.file}`)
      }
      console.log(`   Description: ${offense.description}`)
      console.log(`   Message: ${offense.message || '🚨'}\n`)
    })
  })

  return health
}
