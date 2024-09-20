import type { OverrideConfig } from '../types/Override'
import { RULES, RULESETS } from '../rules/rules'

export const ERROR_WEIGHT = 1.5
export const LOW_HEALTH_THRESHOLD = 75
export const MEDIUM_HEALTH_THRESHOLD = 85
export const OK_HEALTH_THRESHOLD = 95

// In case you need to display all allowed rules/rulesets ⬇️
export const FLAT_RULES = [...Object.values(RULES).flat()]
export const FLAT_RULESETS_RULES: string[] = [...RULESETS, ...FLAT_RULES]

// Override Config ~ Default
export const DEFAULT_OVERRIDE_CONFIG: OverrideConfig = {
  maxExpressionLength: 40,
  maxComputedLength: 5,
  minimumConsonantCount: 3,
  maxPropsCount: 5,
  minVariableName: 4,
  maxParameterCount: 3,
  maxTabs: 5,
  maxVshowLines: 10,
  maxVifLines: 10,
  complexityModerate: 5,
  warningThreshold: 4,
  maxFunctionSize: 20,
  maxScriptLength: 100,
}
