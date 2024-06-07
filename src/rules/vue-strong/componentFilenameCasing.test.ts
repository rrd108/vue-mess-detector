import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  checkComponentFilenameCasing,
  reportComponentFilenameCasing,
  resetComponentFilenameCasing,
} from './componentFilenameCasing'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkComponentFilenameCasing', () => {
  beforeEach(() => {
    resetComponentFilenameCasing()
    mockConsoleLog.mockClear()
  })

  it('ignores PascalCase component file names', () => {
    checkComponentFilenameCasing('components/AppHeader.vue')
    expect(reportComponentFilenameCasing()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('ignores kebab-case component file names', () => {
    checkComponentFilenameCasing('components/app-header.vue')
    expect(reportComponentFilenameCasing()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('detects single lowercase component file names', () => {
    checkComponentFilenameCasing('components/myheader.vue')
    expect(reportComponentFilenameCasing()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
  })

  it('detects single mixed case component file names', () => {
    checkComponentFilenameCasing('components/myHeader.vue')
    expect(reportComponentFilenameCasing()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
  })
})
