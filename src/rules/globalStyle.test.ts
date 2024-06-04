import { describe, expect, it, vi } from 'vitest'
import { SFCStyleBlock } from '@vue/compiler-sfc'
import { checkGlobalStyle, reportGlobalStyle } from './globalStyle'
import { BG_ERR, BG_RESET } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkGlobalStyle', () => {
  it('should not report scoped styles', () => {
    const style = { content: '<style scoped>h3{background:pink}</style>', scoped: true } as SFCStyleBlock
    const filePath = 'scoped-style.vue'
    checkGlobalStyle(style, filePath)
    expect(reportGlobalStyle()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report global styles', () => {
    const style = { content: '<style>h3{background:pink}</style>' } as SFCStyleBlock
    const filePath = 'global-style.vue'
    checkGlobalStyle(style, filePath)
    expect(reportGlobalStyle()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${BG_ERR}${filePath}${BG_RESET}`)
  })
})
