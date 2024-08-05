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
import { reportShortVariableName } from './rules/rrd/shortVariableName'
import { reportSimpleComputed } from './rules/vue-strong/simpleComputed'
import { reportComponentFiles } from './rules/vue-strong/componentFiles'
import { reportImplicitParentChildCommunication } from './rules/vue-caution/implicitParentChildCommunication'
import { reportDeepIndentation } from './rules/rrd/deepIndentation'

export const reportRules = () => {
  let errors = 0

  // vue-essential rules
  errors += reportSingleNameComponent()
  errors += reportSimpleProp()
  errors += reportVforNoKey()
  errors += reportVifWithVfor()
  errors += reportGlobalStyle()

  // vue-strong rules
  errors += reportComponentFilenameCasing()
  errors += reportSelfClosingComponents()
  errors += reportPropNameCasing()
  errors += reportTemplateSimpleExpression()
  errors += reportQuotedAttributeValues()
  errors += reportDirectiveShorthands()
  errors += reportSimpleComputed()
  errors += reportComponentFiles()
  errors += reportFullWordComponentName()

  // vue-recommended rules
  errors += reportTopLevelElementOrder()
  errors += reportElementAttributeOrder()

  // vue-caution rules
  errors += reportImplicitParentChildCommunication()

  // rrd rules
  errors += reportCyclomaticComplexity()
  errors += reportDeepIndentation()
  errors += reportElseCondition()
  errors += reportFunctionSize()
  errors += reportParameterCount()
  errors += reportPlainScript()
  errors += reportScriptLength()
  errors += reportShortVariableName()
  errors += reportTooManyProps()

  return errors
}
