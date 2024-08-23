import fs from 'node:fs/promises'
import path from 'node:path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import { BG_ERR, BG_RESET } from './rules/asceeCodes'
import { RULESETS } from './rules/rules'
import type { GroupBy, OrderBy, OutputFormat, OutputLevel } from './types'
import { customOptionType } from './helpers/validateOption'
import getProjectRoot from './helpers/getProjectRoot'
import coerceRules from './helpers/coerceRules'

const projectRoot = await getProjectRoot()
if (!projectRoot) {
  console.error(`\n${BG_ERR}Cannot find project root.${BG_RESET}\n\n`)
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1)
}

const output: { info: string }[] = []

let config = {
  path: './src',
  apply: undefined, // RULESETS.join(','),
  ignore: undefined,
  exclude: undefined,
  group: 'rule',
  level: 'all',
  order: 'desc',
  output: 'text',
}

// check if the project root has a vue-mess-detector.config.js file and if yes, then read it
try {
  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  const fileConfig = JSON.parse(await fs.readFile(configPath, 'utf-8'))
  config = { ...config, ...fileConfig }
  output.push({ info: `👉 Using configuration from ${configPath}` })
}
catch {
  output.push({ info: `👉 Using default configuration` })
}

// eslint-disable-next-line ts/no-unused-expressions, node/prefer-global/process
yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells and best practices',
    (yargs) => {
      return yargs
        .config(config) // Use the config from the file if available
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
        .option('exclude', {
          alias: 'e',
          describe: 'Exclude files or directories from the analysis',
          default: config.exclude,
          group: 'Exclude files:',
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
          group: 'Order Results:',
        })
        .option('output', {
          describe: 'Output format',
          choices: ['text', 'json'],
          coerce: value => customOptionType<OutputFormat>(value, 'outputFormat'),
          default: config.output,
          group: 'Output Format:',
        })
        .check((argv) => {
          // apply is coming from the config file, ignore is coming from the command line
          if (argv.ignore && argv.apply) {
            console.error(
              `\n${BG_ERR}Cannot use both --ignore and --apply options together.${BG_RESET}\n\n`,
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

      analyze({
        dir: argv.path as string,
        apply: rules,
        exclude: argv.exclude,
        groupBy: argv.group,
        level: argv.level,
        orderBy: argv.order,
      })
        .then((result) => {
          if (argv.output == 'text') {
            [...output, ...result.output].forEach((line) => {
              console.log(line.info)
            })
            result.reportOutput?.forEach((line) => {
              console.log(line.info)
            })
            result.codeHealthOutput?.forEach((line) => {
              console.log(line.info)
            })
          }

          if (argv.output == 'json') {
            console.log(JSON.stringify(result, null, 2))
          }
        })
        .catch((error) => {
          console.error(`${BG_ERR}${error}${BG_RESET}`)
        })
    },
  )
  .help().argv
