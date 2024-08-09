import { beforeEach, describe, expect, it } from 'vitest'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkFullWordComponentName, reportFullWordComponentName, resetFullWordComponentName } from './fullWordComponentName'

describe('checkFullWordComponentName', () => {
  beforeEach(() => {
    resetFullWordComponentName()
  })

  it('should not report files where filename has at least three consonants', () => {
    const filename = 'path/to/file/fullWordComponentNames.vue'
    checkFullWordComponentName(filename)
    expect(reportFullWordComponentName().length).toBe(0)
    expect(reportFullWordComponentName()).toStrictEqual([])
  })

  it('should report files where filename has less than three consonants', () => {
    const filename = 'menu.vue'
    const componentName = 'menu'
    checkFullWordComponentName(filename)
    expect(reportFullWordComponentName().length).toBe(1)
    expect(reportFullWordComponentName()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-strong ~ full-word component names${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Component names should prefer full words over abbreviations.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`,
      message: `${BG_WARN}(${componentName})${BG_RESET} 🚨`,
    }])
  })

  it('should report files where filename has less than three consonants ', () => {
    const filename = 'nav.vue'
    const componentName = 'nav'
    checkFullWordComponentName(filename)
    expect(reportFullWordComponentName().length).toBe(1)
    expect(reportFullWordComponentName()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-strong ~ full-word component names${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Component names should prefer full words over abbreviations.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`,
      message: `${BG_WARN}(${componentName})${BG_RESET} 🚨`,
    }])
  })
})
