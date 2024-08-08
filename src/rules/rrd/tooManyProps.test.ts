import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkTooManyProps, reportTooManyProps, resetTooManyProps } from './tooManyProps'

describe('checkTooManyProps', () => {
  beforeEach(() => {
    resetTooManyProps()
  })

  it('should not report files with less then or exactly 5 props without annotation', () => {
    const script = { content: `<script setup>defineProps({title: String, likes: Number})\n</script>` } as SFCScriptBlock
    const fileName = '2-props-no-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps().length).toBe(0)
    expect(reportTooManyProps()).toStrictEqual([])

    const script2 = {
      content: `<script setup>\nconst props = defineProps({\n\ttitle: String,\n\tlikes: Number})\n</script>`,
    } as SFCScriptBlock
    const fileName2 = '2-props-newline-no-annotate.vue'
    checkTooManyProps(script2, fileName2)
    expect(reportTooManyProps().length).toBe(0)
    expect(reportTooManyProps()).toStrictEqual([])
  })

  it('should not report files with less then or exactly 5 props with annotations', () => {
    const script = { content: `<script setup>\ndefineProps<{title: string,likes: number}>()\n</script>` } as SFCScriptBlock
    const fileName = '2-props-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps().length).toBe(0)
    expect(reportTooManyProps()).toStrictEqual([])
  })

  it('should report files with more then 5 props without annotations', () => {
    const script = {
      content: `<script setup>\ndefineProps({title: String,likes: Number,\nlink: String, shares: Number, show: Boolean, published: Date})\n</script>`,
    } as SFCScriptBlock
    const fileName = '6-props-no-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps().length).toBe(1)
    expect(reportTooManyProps()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ too many props${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to refactor your code to use less properties.${TEXT_RESET}`,
      message: `props found ${BG_ERR}(6)${BG_RESET} 🚨`,
    }])
  })

  it('should report files with more then 5 props with annotations', () => {
    const script = {
      content: `<script setup>\nconst props = defineProps<{\n\ttitle: String,\n\tlikes: Number,\n\tlink: String,\n\tshares: Number,\n\tshow: Boolean,\n\tpublished: Date}>()\n</script>`,
    } as SFCScriptBlock
    const fileName = '6-props-annotate.vue'
    checkTooManyProps(script, fileName)
    expect(reportTooManyProps().length).toBe(1)
    expect(reportTooManyProps()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ too many props${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to refactor your code to use less properties.${TEXT_RESET}`,
      message: `props found ${BG_ERR}(6)${BG_RESET} 🚨`,
    }])
  })
})
