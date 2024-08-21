import fs from 'node:fs/promises'
import path from 'node:path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import { BG_ERR, BG_RESET, TEXT_RESET, TEXT_WARN } from './rules/asceeCodes'
import type { RuleSetType } from './rules/rules'
import { RULESETS } from './rules/rules'
import type { OrderBy, OutputLevel, GroupBy } from './types'
import { customOptionType } from './helpers'
import getProjectRoot from './helpers/getProjectRoot'

const projectRoot = await getProjectRoot()
if (!projectRoot) {
  console.error(`\n${BG_ERR}Cannot find project root.${BG_RESET}\n\n`)
  process.exit(1)
}

let config = {
  path: './src',
  apply: RULESETS.join(','),
  ignore: undefined,
  group: 'rule',
  level: 'all',
  order: 'desc',
}

// check if the project root has a vue-mess-detector.config.js file and if yes, then read it 
try {
  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  config = JSON.parse(await fs.readFile(configPath, 'utf-8'))
  console.log(`👉 Using configuration from ${configPath}`)
} catch (error) {
  console.log(`👉 Using default configuration`)
}

// eslint-disable-next-line ts/no-unused-expressions, node/prefer-global/process
yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells and best practices',
    (yargs) => {
      return yargs
        .config(config)  // Use the config from the file if available
        .positional('path', {
          describe: 'path to the Vue files',
          default: config.path,
        })
        .option('apply', {
          alias: 'a',
          describe: `Comma-separated list of rulesets to apply.`,
          choices: RULESETS,
          coerce: coerceRules('apply'),
          group: 'Filter Rulesets:',
          default: config.apply,
        })
        .option('group', {
          alias: 'g',
          describe: 'Group results at the output',
          choices: ['rule', 'file'],
          coerce: value => customOptionType<GroupBy>(value, 'groupBy'),
          default: config.group,
          group: 'Group Results:',
        })
        .option('level', {
          alias: 'l',
          describe: 'Output level',
          choices: ['all', 'error'],
          coerce: value => customOptionType<OutputLevel>(value, 'outputLevel'),
          default: config.level,
          group: 'Output:',
        })
        .option('ignore', {
          alias: 'i',
          describe: `Comma-separated list of rulesets to ignore.`,
          choices: RULESETS,
          coerce: coerceRules('ignore'),
          default: config.ignore,
          group: 'Filter Rulesets:',
        })
        .option('order', {
          alias: 'o',
          describe: 'Order results at the output',
          choices: ['asc', 'desc'],
          coerce: value => customOptionType<OrderBy>(value, 'orderBy'),
          default: config.order,
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
      analyze({ dir: argv.path as string, level: argv.level, apply: rules, groupBy: argv.group, orderBy: argv.order })
    },
  )
  .help().argv

function coerceRules(optionName: 'ignore' | 'apply') {
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
