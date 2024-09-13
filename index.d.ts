import type { GroupBy, OutputFormat, OutputLevel, SortBy } from './src/types'

// Declare the analyze function
export const analyze: (options: {
  dir: string
  apply: string[]
  ignore: string[]
  exclude?: string
  groupBy: GroupBy
  level: OutputLevel
  sortBy: SortBy
}) => Promise<{
  output: { info: string }[]
  reportOutput: Record<string, Array<{
    id: string
    description: string
    message: string
  }>>
  codeHealthOutput: { info: string }[]
}>

// Declare types for configuration
export interface Config {
  path: string
  apply: string
  ignore?: string
  exclude?: string
  group: GroupBy
  level: OutputLevel
  sort: SortBy
  output: OutputFormat
}

// Declare types for conflicting flags
export interface ConflictingFlags {
  applyFromCLI: boolean
  ignoreFromCLI: boolean
  applyFromFile: boolean
  ignoreFromFile: boolean
}

// Declare the main yargs command
export const command: (
  command: string,
  description: string,
  builder: (yargs: any) => any,
  handler: (argv: any) => void
) => void

// Declare utility functions
export const isNuxtProject: (path?: string) => Promise<boolean>
export const isVueProject: (path?: string) => Promise<boolean>
export const getProjectRoot: (path?: string) => Promise<string>
export const getPackageJson: () => Promise<{ version: string }>
export const validateOption: <T>(value: any, optionType: string) => T
export const wasOptionPassed: (option: string) => boolean
export const coerceRules: (type: 'apply' | 'ignore') => (value: string) => string[]

// Declare constants
export const FLAT_RULESETS_RULES: string[]
export const RULESETS: Record<string, string>
export const GROUP_BY: readonly GroupBy[]
export const OUTPUT_FORMATS: readonly OutputFormat[]
export const OUTPUT_LEVELS: readonly OutputLevel[]
export const SORT_BY: readonly SortBy[]
