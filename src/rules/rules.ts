export const RULES = {
  'vue-caution': ['implicitParentChildCommunication'],
  'vue-essential': ['globalStyle', 'simpleProp', 'singleNameComponent', 'vforNoKey', 'vifWithVfor'],
  'vue-recommended': ['topLevelElementOrder', 'elementAttributeOrder'],
  'vue-strong': [
    'componentFilenameCasing',
    'componentFiles',
    'directiveShorthands',
    'propNameCasing',
    'quotedAttributeValues',
    'selfClosingComponents',
    'simpleComputed',
    'templateSimpleExpression',
    'fullWordComponentName',
  ],
  'rrd': [
    'cyclomaticComplexity',
    'elseCondition',
    'functionSize',
    'parameterCount',
    'plainScript',
    'scriptLenght',
    'shortVariableName',
    'tooManyProps',
  ],
}
export type RuleType = typeof RULES

export const RULESETS = Object.keys(RULES) as Array<keyof typeof RULES>
export type RuleSetType = keyof RuleType
