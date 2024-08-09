import { describe, expect, it, vi } from 'vitest'
import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN } from '../asceeCodes'
import { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped } from './elementSelectorsWithScoped'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkElementSelectorsWithScoped', () => {
  it('should not report non-element selectors', () => {
    const styles = [{ content: '.my-class { font-size: 14px; }', scoped: true }] as SFCStyleBlock[]
    const filePath = 'non-element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filePath)
    expect(reportElementSelectorsWithScoped()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report element selectors in the valid HTML tags list', () => {
    const styles = [{ content: 'button { background: blue; }', scoped: true }] as SFCStyleBlock[]
    const filename = 'element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filename)
    expect(reportElementSelectorsWithScoped()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
      ` - ${filename} 🚨 ${BG_WARN}(button)${BG_RESET}`,
    )
  })

  it('should handle multiple element selectors', () => {
    const styles = [{ content: 'button { background: blue; } div { color: red; }', scoped: true }] as SFCStyleBlock[]
    const filename = 'multiple-element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filename)
    expect(reportElementSelectorsWithScoped()).toBe(3)
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
      ` - ${filename} 🚨 ${BG_WARN}(div)${BG_RESET}`,
    )
  })
})
