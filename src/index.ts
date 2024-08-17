import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import { BG_ERR, BG_RESET, TEXT_RESET, TEXT_WARN } from './rules/asceeCodes'
import type { RuleSetType } from './rules/rules'
import { RULESETS } from './rules/rules'
import { OrderBy, type GroupBy } from './types'
import { customOptionType } from './helpers'

// eslint-disable-next-line ts/no-unused-expressions, node/prefer-global/process
yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells and best practices',
    (yargs) => {
      return yargs
        .positional('path', {
          describe: 'path to the Vue files',
          default: './',
        })
        .option('ignore', {
          alias: 'i',
          describe: `Comma-separated list of rulesets to ignore.`,
          choices: RULESETS,
          coerce: coerceRules('ignore'),
          group: 'Filter Rulesets:',
        })
        .option('apply', {
          alias: 'a',
          describe: `Comma-separated list of rulesets to apply.`,
          choices: RULESETS,
          coerce: coerceRules('apply'),
          group: 'Filter Rulesets:',
        })
        .option('group', {
          alias: 'g',
          describe: 'Group results at the output',
          choices: ['rule', 'file'],
          coerce: value => customOptionType<GroupBy>(value, 'groupBy'),
          default: 'rule',
          group: 'Group Results:',
        })
        .option('order', {
          alias: 'o',
          describe: 'Order results at the output',
          choices: ['asc', 'desc'],
          coerce: value => customOptionType<OrderBy>(value, 'orderBy'),
          default: 'asc',
          group: 'Order Results:'
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
      analyze({ dir: argv.path as string, apply: rules, groupBy: argv.group, orderBy: argv.order })
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
