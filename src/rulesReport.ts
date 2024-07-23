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
import { reportQuotedAttributeValues } from './rules/vue-strong/quotedAttribueValues'
import { reportSelfClosingComponents } from './rules/vue-strong/selfClosingComponents'
import { reportDirectiveShorthands } from './rules/vue-strong/directiveShorthands'
import { reportTooManyProps } from './rules/rrd/tooManyProps'
import { reportFunctionSize } from './rules/rrd/functionSize'
import { reportParameterCount } from './rules/rrd/parameterCount'
import { reportShortVariableName } from './rules/rrd/shortVariableName'
import { reportSimpleComputed } from './rules/vue-strong/simpleComputed'
import { reportComponentFiles } from './rules/vue-strong/componentFiles'
import { reportImplicitParentChildCommunication } from './rules/vue-caution/implicitParentChildCommunication'

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

  // vue-caution rules
  errors += reportImplicitParentChildCommunication()

  // rrd rules
  errors += reportScriptLength()
  errors += reportPlainScript()
  errors += reportCyclomaticComplexity()
  errors += reportElseCondition()
  errors += reportTooManyProps()
  errors += reportFunctionSize()
  errors += reportParameterCount()
  errors += reportShortVariableName()

  return errors
}
