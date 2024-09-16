/* eslint-disable node/prefer-global/process */
import fs from 'node:fs/promises'
import path from 'node:path'
import Table from 'cli-table3'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import coerceRules from './helpers/coerceRules'
import { DEFAULT_OVERRIDE_CONFIG, FLAT_RULESETS_RULES } from './helpers/constants'
import { getPackageJson } from './helpers/getPackageJson'
import getProjectRoot from './helpers/getProjectRoot'
import { validateOption } from './helpers/validateOption'
import { wasOptionPassed } from './helpers/wasOptionPassed'
import { BG_ERR, BG_RESET, tags2Ascee } from './rules/asceeCodes'
import { RULESETS } from './rules/rules'
import { GROUP_BY, OUTPUT_FORMATS, OUTPUT_LEVELS, SORT_BY } from './types'
import type { GroupBy, OutputFormat, OutputLevel, SortBy, VueMessDetectorConfig } from './types'
import type { OverrideConfig } from './types/Override'

const pathArg = process.argv[2] == 'analyze' ? process.argv[3] : process.argv[4]

const overrideConfig: OverrideConfig[] = []

getProjectRoot(pathArg || './src').then((projectRoot) => {
  getPackageJson().then((vmdPackageJson) => {
    const configOutput: { info: string }[] = []

    let config: VueMessDetectorConfig = {
      path: './src',
      apply: Object.values(RULESETS).join(','),
      ignore: undefined,
      exclude: undefined,
      group: 'rule',
      level: 'all',
      sort: 'desc',
      output: 'text',

      override: DEFAULT_OVERRIDE_CONFIG,
    }

    const conflictingFlags: Record<string, boolean> = {
      applyFromCLI: wasOptionPassed('apply'),
      ignoreFromCLI: wasOptionPassed('ignore'),
      applyFromFile: false,
      ignoreFromFile: false,
    }

    let outputFile = ''

    // check if the project root has a vue-mess-detector.config.json file and if yes, then read it
    const configPath = path.join(projectRoot, 'vue-mess-detector.json')
    fs.readFile(configPath, 'utf-8')
      .then((fileContent) => {
        const fileConfig = JSON.parse(fileContent)
        config = { ...config, ...fileConfig }

        // check if the file config has apply or ignore and set the corresponding flag to true
        conflictingFlags.applyFromFile = !!fileConfig.apply
        conflictingFlags.ignoreFromFile = !!fileConfig.ignore

        configOutput.push({ info: `👉 Using configuration from ${configPath}` })
      })
      .catch(() => {
        configOutput.push({ info: `👉 Using default configuration` })
      })
      .finally(() => yargs(hideBin(process.argv))
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
              choices: GROUP_BY,
              coerce: value => validateOption<GroupBy>(value, 'groupBy'),
              default: config.group,
              group: 'Group Results:',
            })
            .option('level', {
              alias: 'l',
              describe: 'Output level',
              choices: OUTPUT_LEVELS,
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
            .option('sort', {
              alias: 's',
              describe: 'Sort results at the output',
              choices: SORT_BY,
              coerce: value => validateOption<SortBy>(value, 'sortBy'),
              default: config.sort,
              group: 'Sort Results:',
            })
            .option('output', {
              describe: 'Output format',
              choices: OUTPUT_FORMATS,
              coerce: value => validateOption<OutputFormat>(value, 'outputFormat'),
              default: config.output,
              group: 'Output Format:',
            })
            .option('fileOutput', {
              alias: 'f',
              describe: 'Output file',
              default: '',
              group: 'Output:',
            })
            .check(() => {
              // check if both apply and ignore are provided (from CLI or file)
              const hasApplyFlag = conflictingFlags.applyFromCLI || conflictingFlags.applyFromFile
              const hasIgnoreFlag = conflictingFlags.ignoreFromCLI || conflictingFlags.ignoreFromFile

              if (hasApplyFlag && hasIgnoreFlag) {
                console.error(`\n<bg_err>Cannot use both --ignore and --apply options together.</bg_err>\n`)

                process.exit(1)
              }

              return true
            }),
          (argv) => {
            outputFile = argv.fileOutput as string
            const log = (message: string) => {
              if (outputFile) {
                fs.appendFile(outputFile, `${message}\n`)
                return message
              }

              console.log(tags2Ascee(message))
              return tags2Ascee(message)
            }

            overrideConfig.push(config.override)

            analyze({
              dir: argv.path as string,
              apply: argv.apply as string[],
              ignore: argv.ignore as string[],
              exclude: argv.exclude,
              groupBy: argv.group,
              level: argv.level,
              sortBy: argv.sort,
            }).then((result) => {
              if (argv.output == 'text') {
                [...configOutput, ...result.output].forEach((line) => {
                  log(line.info)
                })

                for (const group in result.reportOutput) {
                  log(`\n- <text_info> ${group}</text_info>`)
                  result.reportOutput[group].forEach((line) => {
                    log(`   ${line.id}`)
                    log(`   ${line.description}`)
                    log(`   ${line.message}\n`)
                  })
                }

                result.codeHealthOutput?.forEach((line) => {
                  log(line.info)
                })
              }

              if (argv.output == 'table') {
                if (outputFile) {
                  console.log(`We can not output ${BG_ERR}to a file in table mode${BG_RESET}`)
                  process.exit(1)
                }
                [...configOutput, ...result.output].forEach((line) => {
                  log(line.info)
                })

                for (const group in result.reportOutput) {
                  const table = new Table({
                    head: ['id', 'message'],
                    colWidths: [60, 60],
                    wordWrap: true,
                    wrapOnWordBoundary: false,
                  })

                  log('-'.repeat(120))
                  if (argv.group == 'rule') {
                    log(`<text_info>Rule: ${group}</text_info>`)
                    log(`Description: ${result.reportOutput[group][0].description}`)
                    result.reportOutput[group].forEach((line) => {
                      table.push([log(line.id), log(line.message)])
                    })
                  }
                  if (argv.group == 'file') {
                    log(`<text_info>File: ${group}</text_info>`)
                    result.reportOutput[group].forEach((line) => {
                      table.push([`${line.id}\n${line.description.replace('See: ', 'See:\n')}`, line.message])
                    })
                  }
                  log(table.toString())
                }

                result.codeHealthOutput?.forEach((line) => {
                  log(line.info)
                })
              }

              if (argv.output == 'json') {
                log(JSON.stringify(result, null, 2))
              }
            }).catch((error) => {
              console.error(`${BG_ERR}${error}${BG_RESET}`)
            })
          },
        )
        .version('version', 'Show version number', vmdPackageJson.version)
        .alias('version', 'v')
        .help()
        .argv,
      )
  })
})

export { analyze, FLAT_RULESETS_RULES, overrideConfig }
