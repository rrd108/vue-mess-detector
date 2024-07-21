import { describe, expect, it, vi } from 'vitest';
import { SFCScriptBlock } from '@vue/compiler-sfc';
import { BG_ERR, BG_RESET, BG_WARN } from '../asceeCodes';
import { checkComponentFiles, reportComponentFiles } from './componentFiles';

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('checkComponentFiles', () => {
  it('should not report files where each component is its own file', () => {
    const script = {
      content: `
        <script setup>
        console.log('This is just fine');
        </script>
      `
    } as SFCScriptBlock
    const filename = 'component.vue'
    checkComponentFiles(script, filename)
    expect(reportComponentFiles()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files each component is not its own file', () => {
    const script = {
      content: `
        <script setup>
        app.component('TodoList', {
          // ...
        })

        app.component('TodoItem', {
          // ...
        })
        </script>
      `
    } as SFCScriptBlock
    const filename = 'component.vue'
    const lineNumber = 6;
    checkComponentFiles(script, filename)
    expect(reportComponentFiles()).toBe(2)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
      `- ${filename}#${lineNumber} ${BG_WARN}(TodoItem)${BG_RESET} 🚨`
    )
  })
})