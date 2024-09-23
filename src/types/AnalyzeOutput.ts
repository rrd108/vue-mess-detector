import type { CodeHealth } from './index'
import type { ReportOutput } from './ReportOutput'

export interface AnalyzeOutput {
  codeHealthOutput: { info: string }[]
  codeHealth: CodeHealth
  output: { info: string }[]
  reportOutput: ReportOutput
}
