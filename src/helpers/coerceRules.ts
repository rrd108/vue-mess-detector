import { BG_ERR, BG_RESET, TEXT_RESET, TEXT_WARN } from '../rules/asceeCodes'
import { RULES, RULESETS } from '../rules/rules'
import { FLAT_RULESETS_RULES } from './constants'

// This function creates a closure that coerces input rules based on the `optionName` parameter
const coerceRules = (optionName: 'ignore' | 'apply') => {
  return (arg?: string) => {
    // If no argument is provided, return all rules for `apply` option or undefined for `ignore`
    if (!arg) {
      return optionName === 'apply' ? Object.keys(RULES) : undefined
    }

    const values = arg.split(',')
    const appliedRules: string[] = []
    const invalidValues: string[] = []

    values.forEach((value) => {
      if (RULESETS.includes(value as keyof typeof RULES)) { // Check if value is a valid ruleset
        appliedRules.push(...RULES[value as keyof typeof RULES])
      }
      else if (Object.values(RULES).some(ruleset => ruleset.includes(value))) { // Check if value is a valid individual rule
        appliedRules.push(value)
      }
      else {
        invalidValues.push(value)
      }
    })

    if (invalidValues.length > 0) {
      console.error(
        `\n${BG_ERR}Invalid ${optionName} values: ${invalidValues.join(
          ', ',
        )}${BG_RESET}. \n${TEXT_WARN}Allowed values are: ${FLAT_RULESETS_RULES.join(', ')}${TEXT_RESET}\n\n`,
      )
      // eslint-disable-next-line node/prefer-global/process
      process.exit(1)
    }
    return appliedRules
  }
}

export default coerceRules
