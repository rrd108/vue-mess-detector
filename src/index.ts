import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import { BG_ERR, BG_RESET, TEXT_RESET, TEXT_WARN } from './rules/asceeCodes'
import { RULESETS, RuleSetType } from './rules/rules'

yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells',
    yargs => {
      return yargs
        .positional('path', {
          describe: 'path to the Vue files',
          type: 'string',
          default: './',
        })
        .option('ignore', {
          describe: 'Comma-separated list of rules to ignore',
          type: 'string',
          coerce: (arg: string) => {
            const values = arg.split(',')
            const invalidValues = values.filter(value => !RULESETS.includes(value as RuleSetType))
            if (invalidValues.length > 0) {
              console.error(
                `\n${BG_ERR}Invalid ignore values: ${invalidValues.join(
                  ', '
                )}${BG_RESET}. \n${TEXT_WARN}Allowed values are: ${[...RULESETS].join(', ')}${TEXT_RESET}\n\n`
              )
              process.exit(1)
            }
            return values as RuleSetType[]
          },
        })
    },
    argv => {
      analyze(argv.path as string, argv.ignore)
    }
  )
  .help().argv
