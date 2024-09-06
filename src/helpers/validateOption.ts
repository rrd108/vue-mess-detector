import { BG_ERR, BG_INFO, BG_RESET, TEXT_INFO, TEXT_RESET } from '../rules/asceeCodes'
import { GROUP_BY, OUTPUT_FORMATS, OUTPUT_LEVELS, SORT_BY } from '../types'
import type { Flag } from '../types'

const flagOptions: Record<Flag, typeof GROUP_BY | typeof SORT_BY | typeof OUTPUT_LEVELS | typeof OUTPUT_FORMATS> = {
  groupBy: GROUP_BY,
  sortBy: SORT_BY,
  outputLevel: OUTPUT_LEVELS,
  outputFormat: OUTPUT_FORMATS,
}

export const validateOption = <T>(value: T, flag: Flag) => {
  const validOptions = flagOptions[flag]

  if (!Array.isArray(validOptions) || !validOptions.includes(value as any)) {
    console.error(
      `\nInvalid option ${BG_ERR}${value}${BG_RESET} provided for flag ${TEXT_INFO}${flag}${TEXT_RESET}. Valid options are: ${BG_INFO}${validOptions.join(', ')}${BG_RESET}.\n`,
    )
    // eslint-disable-next-line node/prefer-global/process
    process.exit(1)
  }

  return value
}
