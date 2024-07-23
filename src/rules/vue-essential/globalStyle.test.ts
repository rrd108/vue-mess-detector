import { describe, expect, it, vi } from 'vitest'
import { SFCStyleBlock } from '@vue/compiler-sfc'
import { checkGlobalStyle, reportGlobalStyle } from './globalStyle'
import { BG_ERR, BG_RESET } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkGlobalStyle', () => {
  it('should not report scoped styles', () => {
    const styles = [{ content: '<style scoped>h3{background:pink}</style>', scoped: true }] as SFCStyleBlock[]
    const filePath = 'scoped-style.vue'
    checkGlobalStyle(styles, filePath)
    expect(reportGlobalStyle()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report global styles', () => {
    const styles = [{ content: '<style>h3{background:pink}</style>' }] as SFCStyleBlock[]
    const filePath = 'global-style.vue'
    checkGlobalStyle(styles, filePath)
    expect(reportGlobalStyle()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${filePath} 🚨`)
  })
})
