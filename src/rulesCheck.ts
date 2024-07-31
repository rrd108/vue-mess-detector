import type { SFCDescriptor } from '@vue/compiler-sfc'
import { checkScriptLength } from './rules/rrd/scriptLength'
import { checkPlainScript } from './rules/rrd/plainScript'
import { checkElseCondition } from './rules/rrd/elseCondition'
import { checkCyclomaticComplexity } from './rules/rrd/cyclomaticComplexity'
import { checkSingleNameComponent } from './rules/vue-essential/singleNameComponent'
import { checkGlobalStyle } from './rules/vue-essential/globalStyle'
import { checkSimpleProp } from './rules/vue-essential/simpleProp'
import { checkVifWithVfor } from './rules/vue-essential/vifWithVfor'
import { checkVforNoKey } from './rules/vue-essential/vforNoKey'
import { checkComponentFilenameCasing } from './rules/vue-strong/componentFilenameCasing'
import { checkPropNameCasing } from './rules/vue-strong/propNameCasing'
import { checkTemplateSimpleExpression } from './rules/vue-strong/templateSimpleExpression'
import { checkQuotedAttributeValues } from './rules/vue-strong/quotedAttribueValues'
import { checkSelfClosingComponents } from './rules/vue-strong/selfClosingComponents'
import { checkDirectiveShorthands } from './rules/vue-strong/directiveShorthands'
import { checkFullWordComponentName } from './rules/vue-strong/fullWordComponentName'
import { checkTopLevelElementOrder } from './rules/vue-recommended/topLevelElementOrder'
import { checkTooManyProps } from './rules/rrd/tooManyProps'
import { checkFunctionSize } from './rules/rrd/functionSize'
import { checkParameterCount } from './rules/rrd/parameterCount'
import { checkShortVariableName } from './rules/rrd/shortVariableName'
import { checkSimpleComputed } from './rules/vue-strong/simpleComputed'
import { checkComponentFiles } from './rules/vue-strong/componentFiles'
import { checkImplicitParentChildCommunication } from './rules/vue-caution/implicitParentChildCommunication'
import type { RuleSetType } from './rules/rules'
import { checkDeepIndentation } from './rules/rrd/deepIndentation'

export const checkRules = (descriptor: SFCDescriptor, filePath: string, apply: Array<RuleSetType>) => {
  const script = descriptor.scriptSetup || descriptor.script

  if (apply.includes('vue-essential')) {
    checkSingleNameComponent(filePath)
    checkSimpleProp(script, filePath)
    checkGlobalStyle(descriptor.styles, filePath)
    checkVforNoKey(descriptor.template, filePath)
    checkVifWithVfor(descriptor.template, filePath)
  }

  if (apply.includes('vue-strong')) {
    checkComponentFilenameCasing(filePath)
    checkPropNameCasing(script, filePath)
    checkComponentFiles(script, filePath)
    checkSimpleComputed(script, filePath)
    checkSelfClosingComponents(descriptor, filePath)
    checkTemplateSimpleExpression(descriptor.template, filePath)
    checkQuotedAttributeValues(descriptor, filePath)
    checkDirectiveShorthands(descriptor, filePath)
    checkFullWordComponentName(filePath)
  }

  if (apply.includes('vue-recommended')) {
    checkTopLevelElementOrder(descriptor.source, filePath)
  }

  if (apply.includes('vue-caution')) {
    checkImplicitParentChildCommunication(script, filePath)
  }

  if (apply.includes('rrd')) {
    checkCyclomaticComplexity(script, filePath)
    checkDeepIndentation(script, filePath)
    checkElseCondition(script, filePath)
    checkFunctionSize(script, filePath)
    checkParameterCount(script, filePath)
    checkPlainScript(descriptor.script, filePath)
    checkScriptLength(script, filePath)
    checkShortVariableName(script, filePath)
    checkTooManyProps(script, filePath)
  }
}
