import { BG_ERR, BG_RESET, TEXT_RESET, TEXT_WARN } from "../rules/asceeCodes"
import { RULESETS, RuleSetType } from "../rules/rules"

const coerceRules = (optionName: 'ignore' | 'apply') => {
  return (arg: string) => {
    const values = arg?.split(',')
    if (!values) {
      return
    }
    const invalidValues = values.filter(value => !RULESETS.includes(value as RuleSetType))
    if (invalidValues.length > 0) {
      console.error(
        `\n${BG_ERR}Invalid ${optionName} values: ${invalidValues.join(
          ', ',
        )}${BG_RESET}. \n${TEXT_WARN}Allowed values are: ${[...RULESETS].join(', ')}${TEXT_RESET}\n\n`,
      )
      // eslint-disable-next-line node/prefer-global/process
      process.exit(1)
    }
    return values as RuleSetType[]
  }
}

export default coerceRules