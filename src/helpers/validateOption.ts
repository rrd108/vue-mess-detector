import type { Flag, GroupBy, OrderBy } from '../types'
import { OUTPUT_FORMATS, OUTPUT_LEVELS } from '../types'
import { GROUP_BY, OUTPUT_FORMATS, OUTPUT_LEVELS } from '../types'

const flagOptions: Record<Flag, typeof GROUP_BY |  typeof OUTPUT_LEVELS | typeof OUTPUT_FORMATS> = {
  groupBy: GROUP_BY,
  - `asc` is the default order, as the checks run.
  - `desc` will order the results starting by the most problematic file / rule

  The descending order depends on what `groupBy` option is used
  - for grouping by file, it will order depending on the file with most offended rules
  - for grouping by rule, it will order depending on the rule most offended
*/
const validOrderOptions: OrderBy[] = ['asc', 'desc']

const flagOptions: Record<Flag, GroupBy[] | OrderBy[] | typeof OUTPUT_LEVELS | typeof OUTPUT_FORMATS> = {
  groupBy: validGroupByOptions,
  orderBy: validOrderOptions,
  outputLevel: OUTPUT_LEVELS,
  outputFormat: OUTPUT_FORMATS,
}

export const validateOption = <T>(value: T, flag: Flag) => {
  const validOptions = flagOptions[flag]

  if (!Array.isArray(validOptions) || !validOptions.includes(value as any)) {
    console.error(
      `\nInvalid option ${BG_ERR}${value}${BG_RESET} provided for flag ${TEXT_INFO}${flag}${TEXT_RESET}. Valid options are: ${BG_INFO}${validOptions.join(', ')}${BG_RESET}.\n`,
    );
    // eslint-disable-next-line node/prefer-global/process
    process.exit(1)
  }

  return value
}
