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
import { checkTooManyProps } from './rules/rrd/tooManyProps'
import { checkFunctionSize } from './rules/rrd/functionSize'
import { checkParameterCount } from './rules/rrd/parameterCount'
import { checkShortVariableName } from './rules/rrd/shortVariableName'
import { checkSimpleComputed } from './rules/vue-strong/simpleComputed'
import { checkComponentFiles } from './rules/vue-strong/componentFiles'
import { checkImplicitParentChildCommunication } from './rules/vue-caution/implicitParentChildCommunication'
import { SFCDescriptor } from '@vue/compiler-sfc'
import { RuleSetType } from './rules/rules'

export const checkRules = (descriptor: SFCDescriptor, filePath: string, ignore: Array<RuleSetType>) => {
  const script = descriptor.scriptSetup || descriptor.script

  if (!ignore.includes('vue-essential')) {
    checkSingleNameComponent(filePath)
    checkSimpleProp(script, filePath)
    checkGlobalStyle(descriptor.styles, filePath)
    checkVforNoKey(descriptor.template, filePath)
    checkVifWithVfor(descriptor.template, filePath)
  }

  if (!ignore.includes('vue-strong')) {
    checkComponentFilenameCasing(filePath)
    checkPropNameCasing(script, filePath)
    checkComponentFiles(script, filePath)
    checkSimpleComputed(script, filePath)
    checkSelfClosingComponents(descriptor, filePath)
    checkTemplateSimpleExpression(descriptor.template, filePath)
    checkQuotedAttributeValues(descriptor, filePath)
    checkDirectiveShorthands(descriptor, filePath)
  }

  if (!ignore.includes('vue-caution')) {
    checkImplicitParentChildCommunication(script, filePath)
  }

  if (!ignore.includes('rrd')) {
    checkPlainScript(descriptor.script, filePath)
    checkScriptLength(script, filePath)
    checkCyclomaticComplexity(script, filePath)
    checkElseCondition(script, filePath)
    checkTooManyProps(script, filePath)
    checkFunctionSize(script, filePath)
    checkParameterCount(script, filePath)
    checkShortVariableName(script, filePath)
  }
}