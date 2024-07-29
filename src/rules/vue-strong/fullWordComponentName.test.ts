import { describe, expect, it, vi } from 'vitest'
import { checkFullWordComponentName, reportFullWordComponentName } from './fullWordComponentName'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkFullWordComponentName', () => {
  it('should not report files where filename has at least three consonants', () => {
    const filename = 'path/to/file/fullWordComponentNames.vue';
    checkFullWordComponentName(filename);
    expect(reportFullWordComponentName()).toBe(0);
    expect(mockConsoleLog).not.toHaveBeenCalled();
  })

  it('should report files where filename has less than three consonants', () => {
    const filename = 'menu.vue';
    const componentName = 'menu';
    checkFullWordComponentName(filename);
    expect(reportFullWordComponentName()).toBe(1);
    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${filename} 🚨 ${BG_WARN}(${componentName})${BG_RESET}`);
  })

  it('should report files where filename has less than three consonants', () => {
    const filename = 'nav.vue';
    const componentName = 'nav';
    checkFullWordComponentName(filename);
    expect(reportFullWordComponentName()).toBe(2);
    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${filename} 🚨 ${BG_WARN}(${componentName})${BG_RESET}`);
  })
})