export type Flag = 'groupBy' | 'orderBy' | 'outputLevel' | 'outputFormat'
export type GroupBy = 'rule' | 'file'
export type OrderBy = 'asc' | 'desc'
// TODO refactor the above to be like ouput formats - validateOption and src/index.ts (choices) should be also changed
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
