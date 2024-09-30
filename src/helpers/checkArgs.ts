/* eslint-disable node/prefer-global/process */
import { BG_ERR, BG_RESET } from '../rules/asceeCodes'

const checkArgs = (argv: string[], config: { apply?: any, ignore?: any }) => {
  const hasIgnore = argv.some(arg => arg.startsWith('--ignore') || arg.startsWith('-i'))
  const hasApply = argv.some(arg => arg.startsWith('--apply') || arg.startsWith('-a'))

  if (hasIgnore && hasApply) {
    console.error(`${BG_ERR}Cannot use both --ignore and --apply options together.${BG_RESET}`)
    process.exit(1)
  }

  if (config.apply && config.ignore) {
    console.error(`${BG_ERR}Cannot use both --ignore and --apply options together in the vue-mess-detector.json config file.${BG_RESET}`)
    process.exit(1)
  }
}

export default checkArgs
