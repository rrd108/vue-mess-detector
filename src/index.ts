import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import Table from 'cli-table3'
import { analyze } from './analyzer'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET } from './rules/asceeCodes'
import { RULESETS } from './rules/rules'
import type { GroupBy, OrderBy, OutputFormat, OutputLevel } from './types'
import { validateOption } from './helpers/validateOption'
import getProjectRoot from './helpers/getProjectRoot'
import coerceRules from './helpers/coerceRules'
import { FLAT_RULESETS_RULES } from './helpers/constants'
import { OUTPUT_FORMATS } from './types'

const projectRoot = await getProjectRoot()
if (!projectRoot) {
  console.error(`\n${BG_ERR}Cannot find project root.${BG_RESET}\n\n`)
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const toolRoot = path.resolve(__dirname, '..')
const packageJsonPath = path.join(toolRoot, 'package.json')
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))

const configOutput: { info: string }[] = []

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

// check if the project root has a vue-mess-detector.config.json file and if yes, then read it
try {
  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  const fileConfig = JSON.parse(await fs.readFile(configPath, 'utf-8'))
  config = { ...config, ...fileConfig }
  configOutput.push({ info: `👉 Using configuration from ${configPath}` })
}
catch {
  configOutput.push({ info: `👉 Using default configuration` })
}

// eslint-disable-next-line ts/no-unused-expressions, node/prefer-global/process
yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells and best practices',
    yargs => yargs
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
        choices: OUTPUT_FORMATS,
        coerce: value => validateOption<OutputFormat>(value, 'outputFormat'),
        default: config.output,
        group: 'Output Format:',
      }),
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
            [...configOutput, ...result.output].forEach((line) => {
              console.log(line.info)
            })

            for (const group in result.reportOutput) {
              console.log(`\n- ${TEXT_INFO} ${group}${TEXT_RESET}`)
              result.reportOutput[group].forEach((line) => {
                console.log(`   ${line.id}`)
                console.log(`   ${line.description}`)
                console.log(`   ${line.message}\n`)
              })
            }

            result.codeHealthOutput?.forEach((line) => {
              console.log(line.info)
            })
          }

          if (argv.output == 'table') {
            [...configOutput, ...result.output].forEach((line) => {
              console.log(line.info)
            })

            for (const group in result.reportOutput) {
              const table = new Table({
                head: ['id', 'message'],
                colWidths: [60, 60],
                wordWrap: true,
                wrapOnWordBoundary: false,
              })

              console.log('-'.repeat(120))
              if (argv.group == 'rule') {
                console.log(`${TEXT_INFO}Rule: ${group}${TEXT_RESET}`)
                console.log(`Description: ${result.reportOutput[group][0].description}`)
                result.reportOutput[group].forEach((line) => {
                  table.push([line.id, line.message])
                })
              }
              if (argv.group == 'file') {
                console.log(`${TEXT_INFO}File: ${group}${TEXT_RESET}`)
                result.reportOutput[group].forEach((line) => {
                  table.push([`${line.id}\n${line.description.replace('See: ', 'See:\n')}`, line.message])
                })
              }
              console.log(table.toString())
            }

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
