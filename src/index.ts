import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import { BG_ERR, BG_RESET, TEXT_RESET, TEXT_WARN } from './rules/asceeCodes'
import type { RuleSetType } from './rules/rules'
import { RULESETS } from './rules/rules'
import type { GroupBy } from './types'

// eslint-disable-next-line ts/no-unused-expressions, node/prefer-global/process
yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells',
    (yargs) => {
      return yargs
        .positional('path', {
          describe: 'path to the Vue files',
          type: 'string',
          default: './',
        })
        .option('ignore', {
          describe: 'Comma-separated list of rulesets to ignore',
          type: 'string',
          coerce: coerceRules('ignore'),
        })
        .option('apply', {
          describe: 'Comma-separated list of rulesets to apply',
          type: 'string',
          coerce: coerceRules('apply'),
        })
        .option('group', {
          describe: 'Group results by rule or file',
          type: 'string',
          coerce: value => customGroupType(value),
          default: 'rule',
        })
        .check((argv) => {
          if (argv.ignore && argv.apply) {
            console.error(
              `\n${BG_ERR}Cannot use both --ignore and --apply options together.${BG_RESET}.\n\n`,
            )
            // eslint-disable-next-line node/prefer-global/process
            process.exit(1)
          }
          return true
        })
    },
    (argv) => {
      let rules = [...RULESETS]
      if (argv.apply) {
        rules = argv.apply
      }
      if (argv.ignore) {
        rules = RULESETS.filter(rule => !argv.ignore!.includes(rule))
      }
      analyze(argv.path as string, rules, argv.group)
    },
  )
  .help().argv

function coerceRules(optionName: 'ignore' | 'apply') {
  return (arg: string) => {
    const values = arg.split(',')
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

function customGroupType(value: GroupBy) {
  const validChoices: GroupBy[] = ['rule', 'file']
  if (!validChoices.includes(value)) {
    // eslint-disable-next-line node/prefer-global/process
    process.exit(1)
  }
  return value
}
