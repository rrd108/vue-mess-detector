export type Flag = 'groupBy' | 'orderBy' | 'outputLevel' | 'outputFormat'
/*
  - `asc` is the default order, as the checks run.
  - `desc` will order the results starting by the most problematic file / rule

  The descending order depends on what `groupBy` option is used
  - for grouping by file, it will order depending on the file with most offended rules
  - for grouping by rule, it will order depending on the rule most offended
*/
export const GROUP_BY = ['rule', 'file'] as const
export type GroupBy = typeof GROUP_BY[number]

export const ORDER_BY = ['asc', 'desc'] as const
export type OrderBy = typeof ORDER_BY[number]

export const OUTPUT_FORMATS = ['text', 'json', 'table'] as const
export type OutputFormat = typeof OUTPUT_FORMATS[number]

export const OUTPUT_LEVELS = ['all', 'error'] as const
export type OutputLevel = typeof OUTPUT_LEVELS[number]

export interface AnalyzeParams {
  dir: string
  apply: string[]
  ignore?: string[]
  exclude: string
  groupBy: GroupBy
  level: OutputLevel
  orderBy: OrderBy
}

export interface Offense {
  file: string
  rule: string
  title?: string
  description: string
  message: string
}

export type ReportFunction = () => Offense[]

export interface OffensesGrouped {
  [key: string]: Offense[]
}

export interface FileCheckResult {
  filePath: string
  message: string
}

export interface Health {
  file: string
  errors: number
  warnings: number
  output?: { info: string }[]
}

export type CodeHealthResponse = Omit<Health, 'file'>
