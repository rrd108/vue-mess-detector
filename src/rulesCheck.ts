import type { SFCDescriptor } from '@vue/compiler-sfc'
import { RULES } from './rules/rules'

import { checkElementSelectorsWithScoped, checkImplicitParentChildCommunication } from './rules/vue-caution'
import { checkGlobalStyle, checkSimpleProp, checkSingleNameComponent, checkVforNoKey, checkVifWithVfor } from './rules/vue-essential'
import { checkElementAttributeOrder, checkTopLevelElementOrder } from './rules/vue-recommended'
import { checkComponentFilenameCasing, checkComponentFiles, checkDirectiveShorthands, checkFullWordComponentName, checkMultiAttributeElements, checkPropNameCasing, checkQuotedAttributeValues, checkSelfClosingComponents, checkSimpleComputed, checkTemplateSimpleExpression } from './rules/vue-strong'
import { checkBigVif, checkCyclomaticComplexity, checkDeepIndentation, checkElseCondition, checkFunctionSize, checkHtmlLink, checkIfWithoutCurlyBraces, checkMagicNumbers, checkNestedTernary, checkNoPropDestructure, checkParameterCount, checkPlainScript, checkPropsDrilling, checkScriptLength, checkShortVariableName, checkTooManyProps, checkVForWithIndexKey, checkZeroLengthComparison } from './rules/rrd'
import { checkNoVarDeclaration } from './rules/rrd/noVarDeclaration'

export const checkRules = (descriptor: SFCDescriptor, filePath: string, apply: string[]) => {
  const script = descriptor.scriptSetup || descriptor.script

  // ⚠️ contributors ⚠️ script rules can be used for ts, js and vue files, but template and style rules are only for vue files
  const isVueFile = filePath.endsWith('.vue')

  // Create an object that maps rule names to their check functions
  const ruleChecks: Record<string, () => void> = {
    // vue-essential
    simpleProp: () => checkSimpleProp(script, filePath),
    singleNameComponent: () => isVueFile && checkSingleNameComponent(filePath),
    globalStyle: () => isVueFile && checkGlobalStyle(descriptor.styles, filePath),
    vforNoKey: () => isVueFile && checkVforNoKey(descriptor.template, filePath),
    vifWithVfor: () => isVueFile && checkVifWithVfor(descriptor.template, filePath),

    // vue-strong
    simpleComputed: () => checkSimpleComputed(script, filePath),
    componentFiles: () => isVueFile && checkComponentFiles(script, filePath),
    propNameCasing: () => isVueFile && checkPropNameCasing(script, filePath),
    componentFilenameCasing: () => isVueFile && checkComponentFilenameCasing(filePath),
    selfClosingComponents: () => isVueFile && checkSelfClosingComponents(descriptor, filePath),
    templateSimpleExpression: () => isVueFile && checkTemplateSimpleExpression(descriptor.template, filePath),
    quotedAttributeValues: () => isVueFile && checkQuotedAttributeValues(descriptor, filePath),
    directiveShorthands: () => isVueFile && checkDirectiveShorthands(descriptor, filePath),
    fullWordComponentName: () => isVueFile && checkFullWordComponentName(filePath),
    multiAttributeElements: () => isVueFile && checkMultiAttributeElements(descriptor.template, filePath),

    // vue-recommended
    topLevelElementOrder: () => isVueFile && checkTopLevelElementOrder(descriptor.source, filePath),
    elementAttributeOrder: () => isVueFile && checkElementAttributeOrder(descriptor.template, filePath),

    // vue-caution
    implicitParentChildCommunication: () => isVueFile && checkImplicitParentChildCommunication(script, filePath),
    elementSelectorsWithScoped: () => isVueFile && checkElementSelectorsWithScoped(descriptor.styles, filePath),

    // rrd
    bigVif: () => checkBigVif(descriptor.template, filePath),
    cyclomaticComplexity: () => checkCyclomaticComplexity(script, filePath),
    deepIndentation: () => checkDeepIndentation(script, filePath),
    elseCondition: () => checkElseCondition(script, filePath),
    functionSize: () => checkFunctionSize(script, filePath),
    ifWithoutCurlyBraces: () => checkIfWithoutCurlyBraces(script, filePath),
    magicNumbers: () => checkMagicNumbers(script, filePath),
    nestedTernary: () => checkNestedTernary(script, filePath),
    parameterCount: () => checkParameterCount(script, filePath),
    propsDrilling: () => checkPropsDrilling(script, filePath),
    scriptLength: () => checkScriptLength(script, filePath),
    shortVariableName: () => checkShortVariableName(script, filePath),
    tooManyProps: () => checkTooManyProps(script, filePath),
    noPropDestructure: () => checkNoPropDestructure(script, filePath),
    noVarDeclaration: () => checkNoVarDeclaration(script, filePath),
    zeroLengthComparison: () => checkZeroLengthComparison(script, filePath),
    htmlLink: () => isVueFile && checkHtmlLink(descriptor.template, filePath),
    plainScript: () => isVueFile && checkPlainScript(descriptor.script, filePath),
    vForWithIndexKey: () => isVueFile && checkVForWithIndexKey(descriptor.template, filePath),
  }

  // Run the checks for each applied rule or ruleset
  apply.forEach((item) => {
    if (item in RULES) {
      // If it's a ruleset, apply all rules in that ruleset
      RULES[item as keyof typeof RULES].forEach((rule) => {
        if (rule in ruleChecks) {
          ruleChecks[rule]()
        }
      })
    }
    else if (item in ruleChecks) {
      // If it's an individual rule, apply it directly
      ruleChecks[item]()
    }
  })
}
