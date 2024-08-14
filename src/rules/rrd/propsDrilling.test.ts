import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkPropsDrilling, reportPropsDrilling, resetPropsDrilling } from './propsDrilling'

describe('checkPropsDrilling', () => {
  beforeEach(() => {
    resetPropsDrilling()
  })

  it('should not report when a prop is used within the component', () => {
    const script = {
      content: `
        <script setup>
          const props = defineProps(['items'])
          const itemCount = props.items.length;
        </script>
      `,
    } as SFCScriptBlock
    const filePath = 'component.vue'
    checkPropsDrilling(script, filePath)
    expect(reportPropsDrilling().length).toBe(0)
    expect(reportPropsDrilling()).toStrictEqual([])
  })

  it('should not report when a prop is modified before being passed to a child component', () => {
    const script = {
      content: `
        <script setup>
          import { computed } from 'vue'
          const props = defineProps(['items'])
          const filteredItems = computed(() => props.items.filter(item => item.active))
        </script>

        <template>
          <ChildComponent :items="filteredItems" />
        </template>
      `,
    } as SFCScriptBlock
    const filePath = 'component.vue'
    checkPropsDrilling(script, filePath)
    expect(reportPropsDrilling().length).toBe(0)
    expect(reportPropsDrilling()).toStrictEqual([])
  })

  it('should report when a prop is forwarded unmodified to a child component', () => {
    const script = {
      content: `
        <script setup>
          const props = defineProps(['items'])
          const emit = defineEmits(['update'])
          emit('update', props.items)
          <ChildComponent :items="props.items" />
        </script>
      `,
    } as SFCScriptBlock
    const filePath = 'component.vue'
    checkPropsDrilling(script, filePath)
    expect(reportPropsDrilling().length).toBe(1)
    expect(reportPropsDrilling()).toStrictEqual([{
      file: filePath,
      rule: `${TEXT_INFO}rrd ~ props drilling${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Props should not be forwarded unmodified. Consider refactoring.${TEXT_RESET}`,
      message: `Prop ${BG_WARN}(items)${BG_RESET} is being drilled through ${BG_WARN}ChildComponent${BG_RESET} component unmodified. 🚨`,
    }])
  })

  it('should report multiple drilled props in the same file', () => {
    const script = {
      content: `
        <script setup>
          const props = defineProps(['items', 'title'])
          <ChildComponent :items="props.items" />
          <AnotherComponent :title="props.title" />
        </script>
      `,
    } as SFCScriptBlock
    const filePath = 'component.vue'
    checkPropsDrilling(script, filePath)
    expect(reportPropsDrilling().length).toBe(2)
    expect(reportPropsDrilling()).toStrictEqual([{
      file: filePath,
      rule: `${TEXT_INFO}rrd ~ props drilling${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Props should not be forwarded unmodified. Consider refactoring.${TEXT_RESET}`,
      message: `Prop ${BG_WARN}(items)${BG_RESET} is being drilled through ${BG_WARN}ChildComponent${BG_RESET} component unmodified. 🚨`,
    }, {
      file: filePath,
      rule: `${TEXT_INFO}rrd ~ props drilling${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Props should not be forwarded unmodified. Consider refactoring.${TEXT_RESET}`,
      message: `Prop ${BG_WARN}(title)${BG_RESET} is being drilled through ${BG_WARN}AnotherComponent${BG_RESET} component unmodified. 🚨`,
    }])
  })
})
