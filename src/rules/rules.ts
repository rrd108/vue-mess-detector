export const RULES = {
  'vue-caution': [
    'elementSelectorsWithScoped',
    'implicitParentChildCommunication'
  ],
  'vue-essential': [
    'globalStyle',
    'simpleProp',
    'singleNameComponent',
    'vforNoKey',
    'vifWithVfor'
  ],
  'vue-recommended': [
    'elementAttributeOrder',
    'topLevelElementOrder'
  ],
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
    'templateSimpleExpression'
  ],
  'rrd': [
    'apiWithoutMethod',
    'bigVif',
    'bigVshow',
    'complicatedConditions',
    'computedSideEffects',
    'cyclomaticComplexity',
    'deepIndentation',
    'elseCondition',
    'functionSize',
    'htmlImageElements',
    'htmlLink',
    'hugeFiles',
    'ifWithoutCurlyBraces',
    'magicNumbers',
    'nestedTernary',
    'noInlineStyles',
    'noPropDestructure',
    'noTsLang',
    'noVarDeclaration',
    'parameterCount',
    'plainScript',
    'propsDrilling',
    'scriptLength',
    'shortVariableName',
    'tooManyProps',
    'vForWithIndexKey',
    'zeroLengthComparison'
  ]
}

export type RuleType = typeof RULES

export const RULESETS = Object.keys(RULES) as Array<keyof typeof RULES>
export type RuleSetType = keyof RuleType
