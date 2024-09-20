import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { OverrideConfig } from './types/Override'
import { getIsNuxt } from './context'
import { checkApiWithoutMethod, checkBigVif, checkBigVshow, checkComplicatedConditions, checkComputedSideEffects, checkCyclomaticComplexity, checkDeepIndentation, checkElseCondition, checkFunctionSize, checkHtmlImageElements, checkHtmlLink, checkHugeFiles, checkIfWithoutCurlyBraces, checkMagicNumbers, checkNestedTernary, checkNoInlineStyles, checkNoPropDestructure, checkNoVarDeclaration, checkParameterCount, checkPlainScript, checkPropsDrilling, checkScriptLength, checkShortVariableName, checkTooManyProps, checkVForWithIndexKey, checkZeroLengthComparison } from './rules/rrd'
import { RULES } from './rules/rules'
import { checkElementSelectorsWithScoped, checkImplicitParentChildCommunication } from './rules/vue-caution'
import { checkGlobalStyle, checkSimpleProp, checkSingleNameComponent, checkVforNoKey, checkVifWithVfor } from './rules/vue-essential'
import { checkElementAttributeOrder, checkTopLevelElementOrder } from './rules/vue-recommended'
import { checkComponentFilenameCasing, checkComponentFiles, checkDirectiveShorthands, checkFullWordComponentName, checkMultiAttributeElements, checkPropNameCasing, checkQuotedAttributeValues, checkSelfClosingComponents, checkSimpleComputed, checkTemplateSimpleExpression } from './rules/vue-strong'

export const checkRules = (descriptor: SFCDescriptor, filePath: string, apply: string[], override: OverrideConfig) => {
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
    simpleComputed: () => checkSimpleComputed(script, filePath, override.maxComputedLength),
    componentFiles: () => isVueFile && checkComponentFiles(script, filePath),
    propNameCasing: () => isVueFile && checkPropNameCasing(script, filePath),
    componentFilenameCasing: () => isVueFile && checkComponentFilenameCasing(filePath),
    selfClosingComponents: () => isVueFile && checkSelfClosingComponents(descriptor, filePath),
    templateSimpleExpression: () => isVueFile && checkTemplateSimpleExpression(descriptor.template, filePath, override.maxExpressionLength),
    quotedAttributeValues: () => isVueFile && checkQuotedAttributeValues(descriptor, filePath),
    directiveShorthands: () => isVueFile && checkDirectiveShorthands(descriptor, filePath),
    fullWordComponentName: () => isVueFile && checkFullWordComponentName(filePath, override.minimumConsonantCount),
    multiAttributeElements: () => isVueFile && checkMultiAttributeElements(descriptor.template, filePath),

    // vue-recommended
    topLevelElementOrder: () => isVueFile && checkTopLevelElementOrder(descriptor.source, filePath),
    elementAttributeOrder: () => isVueFile && checkElementAttributeOrder(descriptor.template, filePath),

    // vue-caution
    implicitParentChildCommunication: () => isVueFile && checkImplicitParentChildCommunication(script, filePath),
    elementSelectorsWithScoped: () => isVueFile && checkElementSelectorsWithScoped(descriptor.styles, filePath),

    // rrd
    apiWithoutMethod: () => getIsNuxt() && checkApiWithoutMethod(descriptor, filePath),
    bigVif: () => checkBigVif(descriptor.template, filePath, override.maxVifLines),
    bigVShow: () => checkBigVshow(descriptor.template, filePath, override.maxVshowLines),
    complicatedConditions: () => checkComplicatedConditions(descriptor, filePath, override.warningThreshold),
    cyclomaticComplexity: () => checkCyclomaticComplexity(script, filePath, override.complexityModerate),
    computedSideEffects: () => checkComputedSideEffects(script, filePath),
    deepIndentation: () => checkDeepIndentation(script, filePath, override.maxTabs),
    elseCondition: () => checkElseCondition(script, filePath),
    functionSize: () => checkFunctionSize(script, filePath, override.maxFunctionSize),
    htmlImageElements: () => getIsNuxt() && checkHtmlImageElements(descriptor.template, filePath),
    htmlLink: () => isVueFile && checkHtmlLink(descriptor.template, filePath),
    hugeFiles: () => checkHugeFiles(descriptor, filePath, isVueFile),
    ifWithoutCurlyBraces: () => checkIfWithoutCurlyBraces(script, filePath),
    magicNumbers: () => checkMagicNumbers(script, filePath),
    nestedTernary: () => checkNestedTernary(script, filePath),
    noPropDestructure: () => checkNoPropDestructure(script, filePath),
    noVarDeclaration: () => checkNoVarDeclaration(script, filePath),
    parameterCount: () => checkParameterCount(script, filePath, override.maxParameterCount),
    plainScript: () => isVueFile && checkPlainScript(descriptor.script, filePath),
    propsDrilling: () => checkPropsDrilling(script, filePath),
    scriptLength: () => checkScriptLength(script, filePath, override.maxScriptLength),
    shortVariableName: () => checkShortVariableName(script, filePath, override.minVariableName),
    tooManyProps: () => checkTooManyProps(script, filePath, override.maxPropsCount),
    vForWithIndexKey: () => isVueFile && checkVForWithIndexKey(descriptor.template, filePath),
    zeroLengthComparison: () => checkZeroLengthComparison(script, filePath),
    noInlineStyles: () => checkNoInlineStyles(descriptor.template, filePath),
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
    if (item in ruleChecks) {
      // If it's an individual rule, apply it directly
      ruleChecks[item]()
    }
  })
}
