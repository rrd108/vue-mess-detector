import { BG_ERR, BG_INFO, BG_OK, BG_RESET, BG_WARN } from '../rules/asceeCodes'
import type { CodeHealthResponse, Health } from '../types'
import { ERROR_WEIGHT, LOW_HEALTH_THRESHOLD, MEDIUM_HEALTH_THRESHOLD, OK_HEALTH_THRESHOLD } from './constants'

export const calculateCodeHealth = (health: Health[], linesCount: number, filesCount: number): CodeHealthResponse => {
  const { errors, warnings } = health.reduce((acc, { errors, warnings }) => ({ errors: acc.errors + errors, warnings: acc.warnings + warnings }), { errors: 0, warnings: 0 })

  const output: { info: string }[] = []

  output.push({ info: `Found ${BG_ERR}${Intl.NumberFormat('en-US').format(errors)} errors${BG_RESET}, and ${BG_WARN}${Intl.NumberFormat('en-US').format(warnings)} warnings${BG_RESET}, ${BG_INFO}${Intl.NumberFormat('en-US').format(linesCount)} lines${BG_RESET} of code in ${BG_INFO}${Intl.NumberFormat('en-US').format(filesCount)} files${BG_RESET}` })

  const codeHealth = Math.ceil((1 - (errors * ERROR_WEIGHT + warnings) / linesCount) * 100)

  if (codeHealth < LOW_HEALTH_THRESHOLD) {
    output.push({ info: `${BG_ERR}Code health is LOW: ${codeHealth}%${BG_RESET}\n` })
  }

  if (codeHealth >= LOW_HEALTH_THRESHOLD && codeHealth < MEDIUM_HEALTH_THRESHOLD) {
    output.push({ info: `${BG_WARN}Code health is MEDIUM ${codeHealth}%${BG_RESET}\n` })
  }

  if (codeHealth >= MEDIUM_HEALTH_THRESHOLD && codeHealth < OK_HEALTH_THRESHOLD) {
    output.push({ info: `${BG_INFO}Code health is OK: ${codeHealth}%${BG_RESET}\n` })
  }

  if (codeHealth >= OK_HEALTH_THRESHOLD) {
    output.push({ info: `${BG_OK}Code health is GOOD: ${codeHealth}%${BG_RESET}\n` })
  }

  return { errors, warnings, output }
}
