import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkPropNameCasing, reportPropNameCasing } from './propNameCasing'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkPropNameCasing', () => {
  it('should not report files with camelCase props name', () => {
    const script = {
      content: `<script setup>
      const props = defineProps({
        greetingText: String,
      })`,
    } as SFCScriptBlock
    const fileName = 'proper-prop-name.vue'
    checkPropNameCasing(script, fileName)
    expect(reportPropNameCasing()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files with none camelCase props name', () => {
    const script = {
      content: `<script setup>
      const props = defineProps({
        'greeting-text': String
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'mixed-case-prop-name.vue'
    checkPropNameCasing(script, fileName)
    expect(reportPropNameCasing()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} 🚨`)
  })
})
