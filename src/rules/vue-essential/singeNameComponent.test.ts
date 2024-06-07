import { describe, it, expect, vi } from 'vitest'
import { checkSingleNameComponent, reportSingleNameComponent } from './singleNameComponent'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkSingleNameComponent', () => {
  it('ignores pages directory', () => {
    checkSingleNameComponent('pages/SomeComponent.vue')
    expect(reportSingleNameComponent()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('ignores App.vue', () => {
    checkSingleNameComponent('components/App.vue')
    expect(reportSingleNameComponent()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('ignores multi-word component', () => {
    checkSingleNameComponent('components/AppHeader.vue')
    expect(reportSingleNameComponent()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('detects single name component', () => {
    checkSingleNameComponent('components/Header.vue')
    expect(reportSingleNameComponent()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
  })
})
