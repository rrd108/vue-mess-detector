import { beforeEach, describe, expect, it } from 'vitest'

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
      rule: `<text_info>vue-strong ~ full-word component names</text_info>`,
      description: `👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${componentName} is not a <bg_warn>full word.</bg_warn> 🚨`,
    }])
  })

  it('should report files where filename has less than three consonants ', () => {
    const filename = 'nav.vue'
    const componentName = 'nav'
    checkFullWordComponentName(filename)
    expect(reportFullWordComponentName().length).toBe(1)
    expect(reportFullWordComponentName()).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-strong ~ full-word component names</text_info>`,
      description: `👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${componentName} is not a <bg_warn>full word.</bg_warn> 🚨`,
    }])
  })
})
