import type { Offense } from '../../types'
import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'

interface TopLevelElementOrder { filename: string }

const topLevelElementOrderFiles: TopLevelElementOrder[] = []

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

  topLevelElementOrderFiles.push({ filename: filePath })
}

const reportTopLevelElementOrder = () => {
  const offenses: Offense[] = []

  if (topLevelElementOrderFiles.length > 0) {
    topLevelElementOrderFiles.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${TEXT_INFO}vue-recommended ~ top level element order${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Single-File Components should always order <script>, <template>, and <style> tags consistently.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-recommended.html#single-file-component-top-level-element-order`,
        message: '🚨',
      })
    })
  }

  return offenses
}

export { checkTopLevelElementOrder, reportTopLevelElementOrder }
