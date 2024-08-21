export type Flag = 'groupBy' | 'orderBy' | 'outputLevel' | 'outputFormat'
export type GroupBy = 'rule' | 'file'
export type OrderBy = 'asc' | 'desc'
export type OutputLevel = 'all' | 'error'
export type OutputFormat = 'text' | 'json'

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
