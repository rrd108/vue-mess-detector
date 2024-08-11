export const RULES = {
  'vue-caution': ['implicitParentChildCommunication', 'elementSelectorsWithScoped'],
  'vue-essential': ['globalStyle', 'simpleProp', 'singleNameComponent', 'vforNoKey', 'vifWithVfor'],
  'vue-recommended': ['topLevelElementOrder', 'elementAttributeOrder'],
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
    'magicNumbers',
    'parameterCount',
    'plainScript',
    'scriptLength',
    'shortVariableName',
    'tooManyProps',
  ],
}
export type RuleType = typeof RULES

export const RULESETS = Object.keys(RULES) as Array<keyof typeof RULES>
export type RuleSetType = keyof RuleType
