// eslint-disable-next-line unused-imports/no-unused-vars
const OVERWRITABLE_RULES = ['functionSize', 'scriptLength'] as const

type RuleConfig = number

export interface OverrideConfig {
  [key: string]: RuleConfig
}
