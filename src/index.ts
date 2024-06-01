import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { analyze } from './analyzer'

yargs(hideBin(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells',
    yargs => {
      return yargs.positional('path', {
        describe: 'path to the Vue files',
        type: 'string',
        default: './src',
      })
    },
    argv => {
      analyze(argv.path as string)
    }
  )
  .help().argv
