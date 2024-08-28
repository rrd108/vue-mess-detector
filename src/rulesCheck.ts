import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { RuleSetType } from './rules/rules'

import { checkElementSelectorsWithScoped, checkImplicitParentChildCommunication } from './rules/vue-caution'
import { checkGlobalStyle, checkSimpleProp, checkSingleNameComponent, checkVforNoKey, checkVifWithVfor } from './rules/vue-essential'
import { checkElementAttributeOrder, checkTopLevelElementOrder } from './rules/vue-recommended'
import { checkComponentFilenameCasing, checkComponentFiles, checkDirectiveShorthands, checkFullWordComponentName, checkMultiAttributeElements, checkPropNameCasing, checkQuotedAttributeValues, checkSelfClosingComponents, checkSimpleComputed, checkTemplateSimpleExpression } from './rules/vue-strong'
import { checkCyclomaticComplexity, checkDeepIndentation, checkElseCondition, checkFunctionSize, checkHtmlLink, checkIfWithoutCurlyBraces, checkMagicNumbers, checkNestedTernary, checkNoPropDestructure, checkParameterCount, checkPlainScript, checkPropsDrilling, checkScriptLength, checkShortVariableName, checkTooManyProps, checkVForWithIndexKey, checkZeroLengthComparison } from './rules/rrd'

export const checkRules = (descriptor: SFCDescriptor, filePath: string, apply: Array<RuleSetType>) => {
  const script = descriptor.scriptSetup || descriptor.script

  // ⚠️ contributors ⚠️ script rules can be used for ts, js and vue files, but template and style rules are only for vue files
  const isVueFile = filePath.endsWith('.vue')

  if (apply.includes('vue-essential')) {
    checkSimpleProp(script, filePath)

    if (isVueFile) {
      checkSingleNameComponent(filePath)
      checkGlobalStyle(descriptor.styles, filePath)
      checkVforNoKey(descriptor.template, filePath)
      checkVifWithVfor(descriptor.template, filePath)
    }
  }

  if (apply.includes('vue-strong')) {
    checkSimpleComputed(script, filePath)

    if (isVueFile) {
      checkComponentFiles(script, filePath)
      checkPropNameCasing(script, filePath)
      checkComponentFilenameCasing(filePath)
      checkSelfClosingComponents(descriptor, filePath)
      checkTemplateSimpleExpression(descriptor.template, filePath)
      checkQuotedAttributeValues(descriptor, filePath)
      checkDirectiveShorthands(descriptor, filePath)
      checkFullWordComponentName(filePath)
      checkMultiAttributeElements(descriptor.template, filePath)
    }
  }

  if (apply.includes('vue-recommended')) {
    // no rule for ts/js files

    if (isVueFile) {
      checkTopLevelElementOrder(descriptor.source, filePath)
      checkElementAttributeOrder(descriptor.template, filePath)
    }
  }

  if (apply.includes('vue-caution')) {
    // no rule for ts/js files

    if (isVueFile) {
      checkImplicitParentChildCommunication(script, filePath)
      checkElementSelectorsWithScoped(descriptor.styles, filePath)
    }
  }

  if (apply.includes('rrd')) {
    checkCyclomaticComplexity(script, filePath)
    checkDeepIndentation(script, filePath)
    checkElseCondition(script, filePath)
    checkFunctionSize(script, filePath)
    checkIfWithoutCurlyBraces(script, filePath)
    checkMagicNumbers(script, filePath)
    checkNestedTernary(script, filePath)
    checkNoPropDestructure(script, filePath)
    checkNoVarDeclaration(script, filePath)
    checkParameterCount(script, filePath)
    checkPropsDrilling(script, filePath)
    checkScriptLength(script, filePath)
    checkShortVariableName(script, filePath)
    checkTooManyProps(script, filePath)
    checkZeroLengthComparison(script, filePath)

    if (isVueFile) {
      checkHtmlLink(descriptor.template, filePath)
      checkPlainScript(descriptor.script, filePath)
      checkVForWithIndexKey(descriptor.template, filePath)
    }
  }
}
