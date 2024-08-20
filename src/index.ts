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

const getProjectRoot = async () => {
  let currentDir = process.cwd()

  while (currentDir !== path.parse(currentDir).root) {
    // Check if package.json exists in the current directory
    const packageJsonPath = path.join(currentDir, 'package.json')
    await fs.access(packageJsonPath)
    return currentDir
  }

  // Move up one directory level
  currentDir = path.dirname(currentDir)
}

const projectRoot = await getProjectRoot()
if (!projectRoot) {
  console.error(`\n${BG_ERR}Cannot find project root.${BG_RESET}\n\n`)
  process.exit(1)
}
// check if the project root has a vue-mess-detector.config.js file and if yes, then read it 
// TODO add ts support
let config = {
  default: {
    path: './src',
    apply: RULESETS,
    ignore: undefined,
    group: 'rule',
    level: 'all',
    order: 'desc',
  }
}
let configPath = path.join(projectRoot, 'vue-mess-detector.config.js')
let configFile
try {
  configFile = await fs.stat(configPath)
} catch (error) {
  console.log(`Using default configuration`)
}
if (configFile?.isFile()) {
  config = await import(configPath)
  // TODO add auto fixing, and error handling, for example apply contains spaces
}


// eslint-disable-next-line ts/no-unused-expressions, node/prefer-global/process
yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells and best practices',
    (yargs) => {
      return yargs
        .positional('path', {
          describe: 'path to the Vue files',
          default: config.default.path,
        })
        .option('apply', {
          alias: 'a',
          describe: `Comma-separated list of rulesets to apply.`,
          choices: RULESETS,
          coerce: coerceRules('apply'),
          group: 'Filter Rulesets:',
          default: config.default.apply,
        })
        .option('group', {
          alias: 'g',
          describe: 'Group results at the output',
          choices: ['rule', 'file'],
          coerce: value => customOptionType<GroupBy>(value, 'groupBy'),
          default: config.default.group,
          group: 'Group Results:',
        })
        .option('level', {
          alias: 'l',
          describe: 'Output level',
          choices: ['all', 'error'],
          coerce: value => customOptionType<OutputLevel>(value, 'outputLevel'),
          default: config.default.level,
          group: 'Output:',
        })
        .option('ignore', {
          alias: 'i',
          describe: `Comma-separated list of rulesets to ignore.`,
          choices: RULESETS,
          coerce: coerceRules('ignore'),
          default: config.default.ignore,
          group: 'Filter Rulesets:',
        })
        .option('order', {
          alias: 'o',
          describe: 'Order results at the output',
          choices: ['asc', 'desc'],
          coerce: value => customOptionType<OrderBy>(value, 'orderBy'),
          default: config.default.order,
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
