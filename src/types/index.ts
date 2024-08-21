export type Flag = 'groupBy' | 'orderBy' | 'outputLevel'
export type GroupBy = 'rule' | 'file'
export type OrderBy = 'asc' | 'desc'
export type OutputLevel = 'all' | 'error'

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
  output?: any[]
}

export type CodeHealthResponse = Omit<Health, 'file'>
