type RuleConfig = number

export interface OverrideConfig {
  readonly maxFunctionSize: RuleConfig // rule: functionSize
  readonly maxScriptLength: RuleConfig // rule: scriptLength
  readonly maxExpressionLength: RuleConfig // rule: templateSimpleExpression
  readonly maxComputedLength: RuleConfig // rule: simpleComputed
  readonly minimalConsonantCount: RuleConfig // rule: fullwordComponentName
  readonly maxPropsCount: RuleConfig // rule: tooManyProps
  readonly minVariableName: RuleConfig // rule: shortVariableName
  readonly maxParameterCount: RuleConfig // rule: parameterCount
  readonly maxTabs: RuleConfig // rule: noTabs
  readonly maxVshowLines: RuleConfig // rule: bigVshow
  readonly maxVifLines: RuleConfig // rule: bigVif
  readonly complexityModerate: RuleConfig // rule: cyclomaticComplexity
  readonly warningThreshold: RuleConfig // rule: complicatedConditions
}
