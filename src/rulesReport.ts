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
import type { GroupBy, Offense, OffensesGrouped, ReportFunction } from './types'
import { reportHtmlLink } from './rules/rrd/htmlLink'
import { reportIfWithoutCurlyBraces } from './rules/rrd/ifWithoutCurlyBraces'
import { reportMagicNumbers } from './rules/rrd/magicNumbers'
import { reportMultiAttributeElements } from './rules/vue-strong/multiAttributeElements'
import { reportElementSelectorsWithScoped } from './rules/vue-caution/elementSelectorsWithScoped'

export const reportRules = (groupBy: GroupBy) => {
  let errors = 0
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
      errors++
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
  processOffenses(reportParameterCount)
  processOffenses(reportPlainScript)
  processOffenses(reportPropsDrilling)
  processOffenses(reportScriptLength)
  processOffenses(reportShortVariableName)
  processOffenses(reportTooManyProps)

  // Output the report grouped by file
  Object.keys(offensesGrouped).forEach((key) => {
    console.log(`\n - ${key}`)
    offensesGrouped[key].forEach((offense) => {
      if (groupBy === 'file') {
        console.log(`   Rule: ${offense.rule}`)
      }
      else {
        console.log(`   File: ${offense.file}`)
      }
      console.log(`   Description: ${offense.description}`)
      console.log(`   Message: ${offense.message || '🚨'}\n`)
    })
  })

  return errors
}
