import { ERROR_WEIGHT, LOW_HEALTH_THRESHOLD, MEDIUM_HEALTH_THRESHOLD, OK_HEALTH_THRESHOLD } from './constants'
import type { CodeHealthResponse, Health } from '../types'

export const calculateCodeHealth = (health: Health[], linesCount: number, filesCount: number): CodeHealthResponse => {
  const { errors, warnings } = health.reduce((acc, { errors, warnings }) => ({ errors: acc.errors + errors, warnings: acc.warnings + warnings }), { errors: 0, warnings: 0 })

  const output: { info: string }[] = []

  output.push({ info: `Found <bg_err>${Intl.NumberFormat('en-US').format(errors)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat('en-US').format(warnings)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat('en-US').format(linesCount)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat('en-US').format(filesCount)} files</bg_info>` })

  const codeHealth = Math.ceil((1 - (errors * ERROR_WEIGHT + warnings) / linesCount) * 100)

  const BAR_WIDTH = 60
  const yellowLength = !warnings ? 0 : Math.max(1, Math.ceil(warnings / linesCount * BAR_WIDTH))
  const redLength = !errors ? 0 : Math.max(1, BAR_WIDTH - Math.ceil(codeHealth * BAR_WIDTH / 100) - yellowLength)
  const greenLength = BAR_WIDTH - redLength - yellowLength

  const healthBar = `<bg_ok>${' '.repeat(greenLength)}<bg_warn>${' '.repeat(yellowLength)}<bg_err>${' '.repeat(redLength)}</bg_err>`
  output.push({ info: `Code Health: [${healthBar}] ${codeHealth}%\n` })

  if (codeHealth < LOW_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_err>Code health is LOW: ${codeHealth}%</bg_err>\n` })
  }

  if (codeHealth >= LOW_HEALTH_THRESHOLD && codeHealth < MEDIUM_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_warn>Code health is MEDIUM ${codeHealth}%$</bg_warn>\n` })
  }

  if (codeHealth >= MEDIUM_HEALTH_THRESHOLD && codeHealth < OK_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_info>Code health is OK: ${codeHealth}%</bg_info>\n` })
  }

  if (codeHealth >= OK_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_ok>Code health is GOOD: ${codeHealth}%</bg_ok>\n` })
  }

  return { errors, warnings, output }
}
