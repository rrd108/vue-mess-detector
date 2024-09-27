import type { OverrideConfig } from '../types/Override'
import { RULES, RULESETS } from '../rules/rules'

export const ERROR_WEIGHT = 1.5
export const LOW_HEALTH_THRESHOLD = 75
export const MEDIUM_HEALTH_THRESHOLD = 85
export const OK_HEALTH_THRESHOLD = 95

// Console link escape codes
export const ESCAPE_START: string = '\u001B]8;;'
export const ESCAPE_MIDDLE: string = '\u001B\\'
export const ESCAPE_END: string = '\u001B]8;;\u001B\\'

// In case you need to display all allowed rules/rulesets ⬇️
export const FLAT_RULES: string[] = [...Object.values(RULES).flat()]
export const FLAT_RULESETS_RULES: string[] = [...RULESETS, ...FLAT_RULES]

// Direct DOM access methods
export const DOM_METHODS = [
  'getElementById',
  'getElementsByClassName',
  'getElementsByTagName',
  'querySelector',
  'querySelectorAll',
]

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
  maxFileSize: 300,
}
