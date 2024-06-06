import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkSimpleProp, reportSimpleProp } from './simpleProp'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkSimpleProp', () => {
  it('should not report files with detailed props definition', () => {
    const script = {
      content: `<script setup>
    const props = defineProps({
        status: String
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'proper-prop.vue'
    checkSimpleProp(script, fileName)
    expect(reportSimpleProp()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files with simple props defeiniton', () => {
    const script = {
      content: `<script setup>
    const props = defineProps(['status'])
    </script>`,
    } as SFCScriptBlock
    const fileName = 'simple-prop.vue'
    checkSimpleProp(script, fileName)
    expect(reportSimpleProp()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} 🚨`)
  })
})
