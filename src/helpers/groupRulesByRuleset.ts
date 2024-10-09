import type { RuleSetType } from '../rules/rules'
import { RULES } from '../rules/rules'

export function groupRulesByRuleset(apply: string[]): { rulesets: RuleSetType[], individualRules: string[] } {
  const rulesets: RuleSetType[] = []
  const individualRules: string[] = []

  // Iterate through each ruleset and its associated rules
  Object.entries(RULES).forEach(([ruleset, rules]) => {
    // if the ruleset can be found in apply, add it to rulesets
    if (apply.includes(ruleset)) {
      rulesets.push(ruleset as RuleSetType)
      individualRules.push(...rules)
      return
    }

    // Check if all rules in the current ruleset are applied
    if (rules.every(rule => apply.includes(rule))) {
      // If so, add the entire ruleset
      rulesets.push(ruleset as RuleSetType)
      individualRules.push(...rules)
      return
    }

    // Otherwise, find individual rules that are applied
    const appliedRulesInSet = rules.filter(rule => apply.includes(rule))
    // Add these individual rules to the list
    individualRules.push(...appliedRulesInSet)
  })

  return { rulesets: rulesets.sort(), individualRules: individualRules.sort() }
  }
