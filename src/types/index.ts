export type Flag = 'groupBy' | 'sortBy' | 'outputLevel' | 'outputFormat'
/*
  - `asc` is the default order, as the checks run.
  - `desc` will order the results starting by the most problematic file / rule

  The descending order depends on what `groupBy` option is used
  - for grouping by file, it will order depending on the file with most offended rules
  - for grouping by rule, it will order depending on the rule most offended
*/
export const GROUP_BY = ['rule', 'file'] as const
export type GroupBy = typeof GROUP_BY[number]

export const SORT_BY = ['asc', 'desc'] as const
export type SortBy = typeof SORT_BY[number]

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
  sortBy: SortBy
  fileIgnoreRules?: { [key: string]: string }
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
  output: { info: string }[]
}

export interface CodeHealth {
  errors: number
  warnings: number
  linesCount: number
  filesCount: number
  points: number
}

export interface CodeHealthResponse {
  codeHealth: CodeHealth
  output: { info: string }[]
}
