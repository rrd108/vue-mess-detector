import type { FileCheckResult, Offense } from '../../types'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'

const results: FileCheckResult[] = []

/* The opinionated correct order is: script, template, style */
const checkTopLevelElementOrder = (source: string, filePath: string) => {
  // Apply `toString()` because it throws `indexOf` error otherwise
  const content = source.toString()

  const scriptIdx = content.indexOf('<script setup>')
  const templateIdx = content.indexOf('<template>')
  const styleIdx = content.indexOf('<style>')

  // Create an array of present elements and their indices
  const elements = [
    { name: 'script', index: scriptIdx },
    { name: 'template', index: templateIdx },
    { name: 'style', index: styleIdx },
  ].filter(el => el.index !== -1)

  // Check if the order is correct
  const isCorrectOrder = elements.every((el, idx) => {
    if (idx === 0)
      return true
    return elements[idx - 1].index < el.index
  })

  if (isCorrectOrder)
    return // If it's correct, do nothing

  results.push({ filePath, message: `Top level elements are ${BG_WARN}not following the correct order.${BG_RESET}` })
}

const reportTopLevelElementOrder = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-recommended ~ top level element order${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Single-File Components should always order <script>, <template>, and <style> tags consistently.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  return offenses
}

const resetTopLevelElementOrder = () => (results.length = 0)

export { checkTopLevelElementOrder, reportTopLevelElementOrder, resetTopLevelElementOrder }
