import { RULES } from '../rules/rules'
import type { RuleSetType } from '../rules/rules'

export function groupRulesByRuleset(appliedRules: string[]): { rulesets: RuleSetType[], individualRules: string[] } {
  const rulesets: RuleSetType[] = []
  const individualRules: string[] = []

  // Iterate through each ruleset and its associated rules
  Object.entries(RULES).forEach(([ruleset, rules]) => {
    // Check if all rules in the current ruleset are applied
    if (rules.every(rule => appliedRules.includes(rule))) {
      // If so, add the entire ruleset
      rulesets.push(ruleset as RuleSetType)
    }
    else {
      // Otherwise, find individual rules that are applied
      const appliedRulesInSet = rules.filter(rule => appliedRules.includes(rule))
      // Add these individual rules to the list
      individualRules.push(...appliedRulesInSet)
    }
  })

  return { rulesets, individualRules }
}
