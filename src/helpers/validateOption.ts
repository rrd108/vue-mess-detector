import type { Flag, GroupBy, OrderBy, OutputLevel } from '../types'
import { OUTPUT_FORMATS } from '../types'

const validGroupByOptions: GroupBy[] = ['rule', 'file']

/*
  - `asc` is the default order, as the checks run.
  - `desc` will order the results starting by the most problematic file / rule

  The descending order depends on what `groupBy` option is used
  - for grouping by file, it will order depending on the file with most offended rules
  - for grouping by rule, it will order depending on the rule most offended
*/
const validOrderOptions: OrderBy[] = ['asc', 'desc']
const validOutputLevelOptions: OutputLevel[] = ['all', 'error']

const flagOptions: Record<Flag, GroupBy[] | OrderBy[] | OutputLevel[] | typeof OUTPUT_FORMATS> = {
  groupBy: validGroupByOptions,
  orderBy: validOrderOptions,
  outputLevel: validOutputLevelOptions,
  outputFormat: OUTPUT_FORMATS,
}

export const validateOption = <T>(value: T, flag: Flag) => {
  const validOptions = flagOptions[flag]

  if (!validOptions.includes(value as unknown as GroupBy & OrderBy)) {
    console.error(
      `\nInvalid option "${value}" provided for flag "${flag}". Valid options are: ${validOptions.join(', ')}.\n`,
    )
    // eslint-disable-next-line node/prefer-global/process
    process.exit(1)
  }

  return value
}
