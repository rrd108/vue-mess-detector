export const RULES = {
  'vue-caution': ['elementSelectorsWithScoped', 'implicitParentChildCommunication'],
  'vue-essential': ['globalStyle', 'simpleProp', 'singleNameComponent', 'vforNoKey', 'vifWithVfor'],
  'vue-recommended': ['elementAttributeOrder', 'topLevelElementOrder'],
  'vue-strong': [
    'componentFilenameCasing',
    'componentFiles',
    'directiveShorthands',
    'fullWordComponentName',
    'multiAttributeElements',
    'propNameCasing',
    'quotedAttributeValues',
    'selfClosingComponents',
    'simpleComputed',
    'templateSimpleExpression',
  ],
  'rrd': [
    'cyclomaticComplexity',
    'deepIndentation',
    'elseCondition',
    'functionSize',
    'htmlLink',
    'ifWithoutCurlyBraces',
    'magicNumbers',
    'parameterCount',
    'plainScript',
    'propsDrilling',
    'scriptLength',
    'shortVariableName',
    'tooManyProps',
  ],
}
export type RuleType = typeof RULES

export const RULESETS = Object.keys(RULES) as Array<keyof typeof RULES>
export type RuleSetType = keyof RuleType
