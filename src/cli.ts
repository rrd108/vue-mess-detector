/* eslint-disable node/prefer-global/process */
import type { GroupBy, OutputFormat, OutputLevel, SortBy } from './types'
import fs from 'node:fs/promises'
import path from 'node:path'
import Table from 'cli-table3'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'
import coerceRules from './helpers/coerceRules'
import { FLAT_RULES, FLAT_RULESETS_RULES } from './helpers/constants'
import { getConfig } from './helpers/getConfig'
import { getPackageJson } from './helpers/getPackageJson'
import getProjectRoot from './helpers/getProjectRoot'
import { validateOption } from './helpers/validateOption'
import { BG_ERR, BG_RESET, tags2Ascee } from './rules/asceeCodes'
import { GROUP_BY, OUTPUT_FORMATS, OUTPUT_LEVELS, SORT_BY } from './types'

const pathArg = process.argv[2] == 'analyze' ? process.argv[3] : process.argv[4]

getProjectRoot(pathArg || './src').then(async (projectRoot) => {
  const config = await getConfig(projectRoot)

  getPackageJson().then(vmdPackageJson => yargs(hideBin(process.argv))
    .config(config)
    .command(
      'analyze [path]',
      'Analyze Vue files for code smells and best practices',
      yargs => yargs.positional('path', {
        describe: 'path to the Vue files',
        default: './src',
      }).option('apply', {
        alias: 'a',
        describe: `Comma-separated list of rulesets/rules to apply.`,
        choices: FLAT_RULESETS_RULES,
        coerce: coerceRules('apply'),
        group: 'Filter Rulesets/Rules:',
        default: '',
      }).option('exclude', {
        alias: 'e',
        describe: 'Exclude files or directories from the analysis',
        default: '',
        group: 'Exclude files:',
      }).option('group', {
        alias: 'g',
        describe: 'Group results at the output',
        choices: GROUP_BY,
        coerce: value => validateOption<GroupBy>(value, 'groupBy'),
        default: '',
        group: 'Group Results:',
      }).option('level', {
        alias: 'l',
        describe: 'Output level',
        choices: OUTPUT_LEVELS,
        coerce: value => validateOption<OutputLevel>(value, 'outputLevel'),
        default: '',
        group: 'Output:',
      }).option('ignore', {
        alias: 'i',
        describe: `Comma-separated list of rulesets to ignore.`,
        coerce: coerceRules('ignore'),
        default: '',
        group: 'Filter Rulesets:',
      }).option('sort', {
        alias: 's',
        describe: 'Sort results at the output',
        choices: SORT_BY,
        coerce: value => validateOption<SortBy>(value, 'sortBy'),
        default: '',
        group: 'Sort Results:',
      }).option('output', {
        describe: 'Output format',
        choices: OUTPUT_FORMATS,
        coerce: value => validateOption<OutputFormat>(value, 'outputFormat'),
        default: '',
        group: 'Output Format:',
      }).option('fileOutput', {
        alias: 'f',
        describe: 'Output file',
        default: '',
        group: 'Output:',
      }),

      (argv) => {
        const outputFile = argv.fileOutput as string
        const log = (message: string) => {
          if (outputFile) {
            fs.appendFile(outputFile, `${message}\n`)
            return message
          }

          console.log(tags2Ascee(message))
          return tags2Ascee(message)
        }

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
            [...result.output].forEach((line) => {
              log(line.info)
            })

            for (const group in result.reportOutput) {
              let groupOutput = group
              if (argv.group === 'file') {
                groupOutput = `\u001B]8;;file://${path.resolve(group)}\u001B\\${group}\u001B]8;;\u001B\\`
              }
              log(`\n- <text_info> ${groupOutput}</text_info>`)
              result.reportOutput[group].forEach((line) => {
                let idOutput = line.id
                if (argv.group === 'rule') {
                  idOutput = `\u001B]8;;file://${path.resolve(line.id)}\u001B\\${line.id}\u001B]8;;\u001B\\`
                }
                log(`   ${idOutput}`)
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
            [...result.output].forEach((line) => {
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

export { analyze, FLAT_RULES }
