import { BG_ERR, BG_RESET, BG_WARN, BG_INFO, BG_OK } from "../rules/asceeCodes";
import { CodeHealthResponse, Flag, GroupBy, Health, OrderBy, OutputLevel } from "../types";
import { ERROR_WEIGHT, LOW_HEALTH_THRESHOLD, MEDIUM_HEALTH_THRESHOLD, OK_HEALTH_THRESHOLD } from "./constants";

/* Helper function to count non duplicated objects (using `field` to filter) */
export function getUniqueFilenameCount<T>(arr: T[], field: Partial<keyof T>): number {
  const uniqueFilenames = new Set(arr.map((item) => item[field]));
  return uniqueFilenames.size;
}

const validGroupByOptions: GroupBy[] = ['rule', 'file'];

/*
  - `asc` is the default order, as the checks run.
  - `desc` will order the results starting by the most problematic file / rule

  The descending order depends on what `groupBy` option is used
  - for grouping by file, it will order depending on the file with most offended rules
  - for grouping by rule, it will order depending on the rule most offended
*/
const validOrderOptions: OrderBy[] = ['asc', 'desc'];

const validOutputLevelOptions: OutputLevel[] = ['all', 'error'];

const flagOptions: Record<Flag, GroupBy[] | OrderBy[] | OutputLevel[]> = {
  groupBy: validGroupByOptions,
  orderBy: validOrderOptions,
  outputLevel: validOutputLevelOptions
}

export function customOptionType<T>(value: T, flag: Flag) {
  const validOptions = flagOptions[flag];

  if (!validOptions.includes(value as unknown as GroupBy & OrderBy)) {
    console.error(
      `\nInvalid option "${value}" provided for flag "${flag}". Valid options are: ${validOptions.join(', ')}.\n`,
    )
    // eslint-disable-next-line node/prefer-global/process
    process.exit(1)
  }

  return value
}

export function calculateCodeHealth(health: Health[], linesCount: number, filesCount: number): CodeHealthResponse {
  const { errors, warnings } = health.reduce((acc, { errors, warnings }) => ({ errors: acc.errors + errors, warnings: acc.warnings + warnings }), { errors: 0, warnings: 0 })

  console.log(`Found ${BG_ERR}${Intl.NumberFormat('en-US').format(errors)} errors${BG_RESET}, and ${BG_WARN}${Intl.NumberFormat('en-US').format(warnings)} warnings${BG_RESET}, ${BG_INFO}${Intl.NumberFormat('en-US').format(linesCount)} lines${BG_RESET} of code in ${BG_INFO}${Intl.NumberFormat('en-US').format(filesCount)} files${BG_RESET}`)

  const codeHealth = Math.ceil((1 - (errors * ERROR_WEIGHT + warnings) / linesCount) * 100)

  if (codeHealth < LOW_HEALTH_THRESHOLD) {
    console.log(`${BG_ERR}Code health is LOW: ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= LOW_HEALTH_THRESHOLD && codeHealth < MEDIUM_HEALTH_THRESHOLD) {
    console.log(`${BG_WARN}Code health is MEDIUM ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= MEDIUM_HEALTH_THRESHOLD && codeHealth < OK_HEALTH_THRESHOLD) {
    console.log(`${BG_INFO}Code health is OK: ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= OK_HEALTH_THRESHOLD) {
    console.log(`${BG_OK}Code health is GOOD: ${codeHealth}%${BG_RESET}`)
  }

  return { errors, warnings }
}