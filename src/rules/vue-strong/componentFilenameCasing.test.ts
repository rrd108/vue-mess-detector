import { beforeEach, describe, expect, it } from 'vitest'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import {
  checkComponentFilenameCasing,
  reportComponentFilenameCasing,
  resetComponentFilenameCasing,
} from './componentFilenameCasing'

describe('checkComponentFilenameCasing', () => {
  beforeEach(() => {
    resetComponentFilenameCasing()
  })

  it('ignores PascalCase component file names', () => {
    checkComponentFilenameCasing('components/AppHeader.vue')
    expect(reportComponentFilenameCasing().length).toBe(0)
    expect(reportComponentFilenameCasing()).toStrictEqual([])
  })

  it('ignores components in pages folder - Linux', () => {
    checkComponentFilenameCasing('pages/gauranga.vue')
    expect(reportComponentFilenameCasing().length).toBe(0)
    expect(reportComponentFilenameCasing()).toStrictEqual([])
  })
  it('ignores components in pages folder - Windows', () => {
    checkComponentFilenameCasing(`pages\gauranga.vue`)
    expect(reportComponentFilenameCasing().length).toBe(0)
    expect(reportComponentFilenameCasing()).toStrictEqual([])
  })

  it('ignores components in layouts folder', () => {
    checkComponentFilenameCasing('layouts/gauranga.vue')
    expect(reportComponentFilenameCasing().length).toBe(0)
    expect(reportComponentFilenameCasing()).toStrictEqual([])
  })

  it('ignores kebab-case component file names', () => {
    checkComponentFilenameCasing('components/app-header.vue')
    expect(reportComponentFilenameCasing().length).toBe(0)
    expect(reportComponentFilenameCasing()).toStrictEqual([])
  })

  it('detects single lowercase component file names', () => {
    checkComponentFilenameCasing('components/myheader.vue')
    expect(reportComponentFilenameCasing().length).toBe(1)
    expect(reportComponentFilenameCasing()).toStrictEqual([{
      file: 'components/myheader.vue',
      rule: `${TEXT_INFO}vue-strong ~ component name is not PascalCase and not kebab-case${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Rename the component to use PascalCase or kebab-case file name.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `component name is ${BG_WARN}not PascalCase, nor kebab-case.${BG_RESET} 🚨`,
    }])
  })

  it('detects single mixed case component file names', () => {
    checkComponentFilenameCasing('components/myHeader.vue')
    expect(reportComponentFilenameCasing().length).toBe(1)
    expect(reportComponentFilenameCasing()).toStrictEqual([{
      file: 'components/myHeader.vue',
      rule: `${TEXT_INFO}vue-strong ~ component name is not PascalCase and not kebab-case${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Rename the component to use PascalCase or kebab-case file name.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `component name is ${BG_WARN}not PascalCase, nor kebab-case.${BG_RESET} 🚨`,
    }])
  })
})
