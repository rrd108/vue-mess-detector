import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkTooManyProps, reportTooManyProps } from './tooManyProps'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkTooManyProps', () => {
  it('should not report files with less then or exactly 5 props without annotation', () => {
    const script = { content: `<script setup>defineProps({title: String, likes: Number})\n</script>` } as SFCScriptBlock
    const fileName = '2-props-no-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()

    const script2 = {
      content: `<script setup>\nconst props = defineProps({\n\ttitle: String,\n\tlikes: Number})\n</script>`,
    } as SFCScriptBlock
    const fileName2 = '2-props-newline-no-annotate.vue'
    checkTooManyProps(script2, fileName2)
    expect(reportTooManyProps()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should not report files with less then or exactly 5 props with annotations', () => {
    const script = { content: `<script setup>\ndefineProps<{title: string,likes: number}>()\n</script>` } as SFCScriptBlock
    const fileName = '2-props-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files with more then 5 props without annotations', () => {
    const script = {
      content: `<script setup>\ndefineProps({title: String,likes: Number,\nlink: String, shares: Number, show: Boolean, published: Date})\n</script>`,
    } as SFCScriptBlock
    const fileName = '6-props-no-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} ${BG_WARN}(6)${BG_RESET}`)
  })

  it('should report files with more then 5 props with annotations', () => {
    const script = {
      content: `<script setup>\nconst props = defineProps<{\n\ttitle: String,\n\tlikes: Number,\n\tlink: String,\n\tshares: Number,\n\tshow: Boolean,\n\tpublished: Date}>()\n</script>`,
    } as SFCScriptBlock
    const fileName = '6-props-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps()).toBe(2)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} ${BG_WARN}(6)${BG_RESET}`)
  })
})
