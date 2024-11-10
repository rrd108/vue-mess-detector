import type { RuleSetType } from '../rules/rules'
import { minimatch } from 'minimatch'
import { RULES, RULESETS } from '../rules/rules'

export const checkFileIgnoreRules = (filePath: string, fileIgnoreRules: { [key: string]: string }, _apply: string[]) => {
  let apply = [..._apply] // Here we get a list of rules only - no rule sets

  for (const [pattern, rules] of Object.entries(fileIgnoreRules)) {
    if (minimatch(filePath, pattern, { matchBase: true })) {
      const ignoreRules = rules.split(',').map(rule => rule.trim())
      // Expand ignoreRules by replacing rulesets with individual rules
      const expandedIgnoreRules = ignoreRules.flatMap((rule) => {
        if (RULESETS.includes(rule as RuleSetType)) {
          return RULES[rule as RuleSetType]
        }
        else {
          return rule
        }
      })

      // Remove duplicates by converting to a Set and back to an array
      const uniqueIgnoreRules = Array.from(new Set(expandedIgnoreRules))
      apply = apply.filter(rule => !uniqueIgnoreRules.includes(rule))
    }
  }

  return apply
}
