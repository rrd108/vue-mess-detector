import { Flag, GroupBy, OrderBy } from "../types";

// Helper function to count non duplicated objects (using `field` to filter)
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

const flagOptions: Record<Flag, GroupBy[] | OrderBy[]> = {
  groupBy: validGroupByOptions,
  orderBy: validOrderOptions
}

export function customOptionType<T>(value: T, flag: Flag) {
  const validOptions = flagOptions[flag];

  if (!validOptions.includes(value as unknown as GroupBy & OrderBy)) {
    // eslint-disable-next-line node/prefer-global/process
    process.exit(1)
  }

  return value
}