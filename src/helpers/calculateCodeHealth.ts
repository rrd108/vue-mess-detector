import type { CodeHealthResponse, Health } from '../types'
import { ERROR_WEIGHT, LOW_HEALTH_THRESHOLD, MEDIUM_HEALTH_THRESHOLD, OK_HEALTH_THRESHOLD } from './constants'

export const calculateCodeHealth = (health: Health[], linesCount: number, filesCount: number): CodeHealthResponse => {
  const { errors, warnings } = health.reduce((acc, { errors, warnings }) => ({ errors: acc.errors + errors, warnings: acc.warnings + warnings }), { errors: 0, warnings: 0 })

  const output: { info: string }[] = []
  const codeHealth = { errors, warnings, linesCount, filesCount, points: 0 }

  output.push({ info: `Found <bg_err>${Intl.NumberFormat('en-US').format(errors)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat('en-US').format(warnings)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat('en-US').format(linesCount)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat('en-US').format(filesCount)} files</bg_info>` })

  if (!linesCount) {
    codeHealth.points = 0
    output.push({ info: `Code Health can not be calculated, because there is no code in the given files\n` })
    return { codeHealth, output }
  }

  const codeHealthPoints = Math.ceil((1 - (errors * ERROR_WEIGHT + warnings) / linesCount) * 100)
  codeHealth.points = codeHealthPoints

  const BAR_WIDTH = 60
  const yellowLength = !warnings ? 0 : Math.max(1, Math.ceil(warnings / linesCount * BAR_WIDTH))
  const redLength = !errors ? 0 : Math.max(1, BAR_WIDTH - Math.ceil(codeHealthPoints * BAR_WIDTH / 100) - yellowLength)
  const greenLength = BAR_WIDTH - redLength - yellowLength

  const healthBar = `<bg_ok>${'_'.repeat(greenLength)}</bg_ok><bg_warn>${'_'.repeat(yellowLength)}</bg_warn><bg_err>${'_'.repeat(redLength)}</bg_err>`
  output.push({ info: `Code Health: [${healthBar}] ${codeHealthPoints}%\n` })

  if (codeHealthPoints < LOW_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_err>Code health is LOW: ${codeHealthPoints}%</bg_err>\n` })
  }

  if (codeHealthPoints >= LOW_HEALTH_THRESHOLD && codeHealthPoints < MEDIUM_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_warn>Code health is MEDIUM ${codeHealthPoints}%$</bg_warn>\n` })
  }

  if (codeHealthPoints >= MEDIUM_HEALTH_THRESHOLD && codeHealthPoints < OK_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_info>Code health is OK: ${codeHealthPoints}%</bg_info>\n` })
  }

  if (codeHealthPoints >= OK_HEALTH_THRESHOLD) {
    output.push({ info: `<bg_ok>Code health is GOOD: ${codeHealthPoints}%</bg_ok>\n` })
  }

  return { codeHealth, output }
}
