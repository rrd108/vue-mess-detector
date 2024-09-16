import type { ReportOutput } from "./ReportOutput"

export interface AnalyzeOutput {
  output: { info: string }[]
  codeHealthOutput: { info: string }[]
  reportOutput: ReportOutput
}
