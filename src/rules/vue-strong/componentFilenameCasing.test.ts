import { beforeEach, describe, expect, it } from 'vitest'
import {
  checkComponentFilenameCasing,
  reportComponentFilenameCasing,
  resetResults,
} from './componentFilenameCasing'

describe('checkComponentFilenameCasing', () => {
  beforeEach(() => {
    resetResults()
  })

  it('ignores PascalCase component file names', () => {
    checkComponentFilenameCasing('components/AppHeader.vue')
    const result = reportComponentFilenameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('ignores components in pages folder - Linux', () => {
    checkComponentFilenameCasing('pages/gauranga.vue')
    const result = reportComponentFilenameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })
  it('ignores components in pages folder - Windows', () => {
    checkComponentFilenameCasing(`pages\gauranga.vue`)
    const result = reportComponentFilenameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('ignores components in layouts folder', () => {
    checkComponentFilenameCasing('layouts/gauranga.vue')
    const result = reportComponentFilenameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('ignores kebab-case component file names', () => {
    checkComponentFilenameCasing('components/app-header.vue')
    const result = reportComponentFilenameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('detects single lowercase component file names', () => {
    checkComponentFilenameCasing('components/myheader.vue')
    const result = reportComponentFilenameCasing()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: 'components/myheader.vue',
      rule: `<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>`,
      description: `👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn> 🚨`,
    }])
  })

  it('detects single mixed case component file names', () => {
    checkComponentFilenameCasing('components/myHeader.vue')
    const result = reportComponentFilenameCasing()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: 'components/myHeader.vue',
      rule: `<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>`,
      description: `👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn> 🚨`,
    }])
  })
})
