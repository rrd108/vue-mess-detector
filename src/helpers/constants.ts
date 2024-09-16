import type { OverrideConfig } from '../types/Override'
import { RULES, RULESETS } from '../rules/rules'

export const ERROR_WEIGHT = 1.5
export const LOW_HEALTH_THRESHOLD = 75
export const MEDIUM_HEALTH_THRESHOLD = 85
export const OK_HEALTH_THRESHOLD = 95

// In case you need to display all allowed rules/rulesets ⬇️
export const FLAT_RULESETS_RULES: string[] = [...RULESETS, ...Object.values(RULES).flat()]

// Override Config ~ Default
export const DEFAULT_OVERRIDE_CONFIG: OverrideConfig = {
  maxFunctionSize: 20,
  maxScriptLength: 100,
}
