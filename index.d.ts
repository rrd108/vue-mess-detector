import type { GroupBy, OutputFormat, OutputLevel, SortBy } from './src/types'
import type { AnalyzeOutput } from './src/types/AnalyzeOutput'

// Exports from analyze.ts
export const analyze: (options: {
  dir: string
  apply?: string[]
  ignore?: string[]
  exclude?: string
  groupBy?: GroupBy
  level?: OutputLevel
  sortBy?: SortBy
}) => Promise<AnalyzeOutput>

// Exports from cli.ts
export const FLAT_RULES: string[]

// Types used in the exported functions
export type { AnalyzeOutput, GroupBy, OutputFormat, OutputLevel, SortBy }
