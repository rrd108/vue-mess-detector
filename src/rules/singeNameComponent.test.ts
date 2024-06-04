import { test, expect, vi } from 'vitest'
import { checkSingleNameComponent, reportSingleNameComponent } from './singleNameComponent'

// mock console log with vitest
const mockConsoleLog = vi.spyOn(console, 'log')

test('checkSingleNameComponent - ignores pages directory', () => {
  checkSingleNameComponent('pages/SomeComponent.vue')
  expect(reportSingleNameComponent()).toBe(0)
  expect(mockConsoleLog).not.toHaveBeenCalled()
})

test('checkSingleNameComponent - ignores App.vue', () => {
  checkSingleNameComponent('components/App.vue')
  expect(reportSingleNameComponent()).toBe(0)
  expect(mockConsoleLog).not.toHaveBeenCalled()
})

test('checkSingleNameComponent - ignores multi-word component', () => {
  checkSingleNameComponent('components/AppHeader.vue')
  expect(reportSingleNameComponent()).toBe(0)
  expect(mockConsoleLog).not.toHaveBeenCalled()
})

test('checkSingleNameComponent - detects single name component', () => {
  checkSingleNameComponent('components/Header.vue')
  expect(reportSingleNameComponent()).toBe(1)
  expect(mockConsoleLog).toHaveBeenCalled()
})
