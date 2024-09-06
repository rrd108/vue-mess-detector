import fs from 'node:fs/promises'
import path from 'node:path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import { BG_ERR, BG_RESET } from './rules/asceeCodes'
import { RULESETS } from './rules/rules'
import type { GroupBy, OrderBy, OutputFormat, OutputLevel } from './types'
import { validateOption } from './helpers/validateOption'
import getProjectRoot from './helpers/getProjectRoot'
import coerceRules from './helpers/coerceRules'
import { FLAT_RULESETS_RULES } from './helpers/constants'
import { wasOptionPassed } from './helpers/wasOptionPassed'

const projectRoot = await getProjectRoot()
if (!projectRoot) {
  console.error(`\n${BG_ERR}Cannot find project root.${BG_RESET}\n\n`)
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1)
}

const packageJson = JSON.parse(await fs.readFile(path.join(projectRoot, 'package.json'), 'utf-8'))

const output: { info: string }[] = []

let config = {
  path: './src',
  apply: Object.values(RULESETS).join(','),
  ignore: undefined,
  exclude: undefined,
  group: 'rule',
  level: 'all',
  order: 'desc',
  output: 'text',
}

const conflictingFlags: Record<string, boolean> = {
  applyFromCLI: wasOptionPassed('apply'),
  ignoreFromCLI: wasOptionPassed('ignore'),
  applyFromFile: false,
  ignoreFromFile: false,
}

// check if the project root has a vue-mess-detector.config.json file and if yes, then read it
try {
  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  const fileConfig = JSON.parse(await fs.readFile(configPath, 'utf-8'))
  config = { ...config, ...fileConfig }

  // check if the file config has apply or ignore and set the corresponding flag to true
  conflictingFlags.applyFromFile = !!fileConfig.apply
  conflictingFlags.ignoreFromFile = !!fileConfig.ignore

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
          describe: `Comma-separated list of rulesets/rules to apply.`,
          choices: FLAT_RULESETS_RULES,
          coerce: coerceRules('apply'),
          group: 'Filter Rulesets/Rules:',
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
          coerce: value => validateOption<GroupBy>(value, 'groupBy'),
          default: config.group,
          group: 'Group Results:',
        })
        .option('level', {
          alias: 'l',
          describe: 'Output level',
          choices: ['all', 'error'],
          coerce: value => validateOption<OutputLevel>(value, 'outputLevel'),
          default: config.level,
          group: 'Output:',
        })
        .option('ignore', {
          alias: 'i',
          describe: `Comma-separated list of rulesets to ignore.`,
          coerce: coerceRules('ignore'),
          default: config.ignore,
          group: 'Filter Rulesets:',
        })
        .option('order', {
          alias: 'o',
          describe: 'Order results at the output',
          choices: ['asc', 'desc'],
          coerce: value => validateOption<OrderBy>(value, 'orderBy'),
          default: config.order,
          group: 'Order Results:',
        })
        .option('output', {
          describe: 'Output format',
          choices: ['text', 'json'],
          coerce: value => validateOption<OutputFormat>(value, 'outputFormat'),
          default: config.output,
          group: 'Output Format:',
        })
        .check(() => {
          // check if both apply and ignore are provided (from CLI or file)
          const hasApplyFlag = conflictingFlags.applyFromCLI || conflictingFlags.applyFromFile
          const hasIgnoreFlag = conflictingFlags.ignoreFromCLI || conflictingFlags.ignoreFromFile

          if (hasApplyFlag && hasIgnoreFlag) {
            console.error(`\n${BG_ERR}Cannot use both --ignore and --apply options together.${BG_RESET}\n`)
            // eslint-disable-next-line node/prefer-global/process
            process.exit(1)
          }

          return true
        })
    },
    (argv) => {
      analyze({
        dir: argv.path as string,
        apply: argv.apply as string[],
        ignore: argv.ignore as string[],
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
  .version('version', 'Show version number', packageJson.version)
  .alias('version', 'v')
  .help().argv
