import { describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkFullWordComponentName, reportFullWordComponentName } from './fullWordComponentName'

describe('fullWordComponentName', () => {
  it('should not report files where filename has at least three consonants', () => {
    const filename = 'path/to/file/fullWordComponentNames.vue'
    const minimumConsonantCount = DEFAULT_OVERRIDE_CONFIG.minimumConsonantCount
    checkFullWordComponentName(filename, minimumConsonantCount)
    const result = reportFullWordComponentName()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where filename is app.vue', () => {
    const filename = 'src/app.vue'
    const minimumConsonantCount = DEFAULT_OVERRIDE_CONFIG.minimumConsonantCount
    checkFullWordComponentName(filename, minimumConsonantCount)
    const result = reportFullWordComponentName()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where filename is index.vue', () => {
    const filename = 'src/index.vue'
    const minimumConsonantCount = DEFAULT_OVERRIDE_CONFIG.minimumConsonantCount
    checkFullWordComponentName(filename, minimumConsonantCount)
    const result = reportFullWordComponentName()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where filename is inside square brackets like [id].vue', () => {
    const filename = 'src/[id].vue'
    const minimumConsonantCount = DEFAULT_OVERRIDE_CONFIG.minimumConsonantCount
    checkFullWordComponentName(filename, minimumConsonantCount)
    const result = reportFullWordComponentName()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where filename has less than three consonants', () => {
    const filename = 'menu.vue'
    const componentName = 'menu'
    const minimumConsonantCount = DEFAULT_OVERRIDE_CONFIG.minimumConsonantCount
    checkFullWordComponentName(filename, minimumConsonantCount)
    const result = reportFullWordComponentName()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-strong ~ full-word component names</text_info>`,
      description: `👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${componentName} is not a <bg_warn>full word.</bg_warn> 🚨`,
    }])
  })

  it('should report files where filename has less than three consonants ', () => {
    const filename = 'nav.vue'
    const componentName = 'nav'
    const minimumConsonantCount = DEFAULT_OVERRIDE_CONFIG.minimumConsonantCount
    checkFullWordComponentName(filename, minimumConsonantCount)
    const result = reportFullWordComponentName()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-strong ~ full-word component names</text_info>`,
      description: `👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${componentName} is not a <bg_warn>full word.</bg_warn> 🚨`,
    }])
  })
})
