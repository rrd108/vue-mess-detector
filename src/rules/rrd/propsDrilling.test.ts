import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkPropsDrilling, reportPropsDrilling } from './propsDrilling'

describe('checkPropsDrilling', () => {
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
    const result = reportPropsDrilling()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const result = reportPropsDrilling()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const result = reportPropsDrilling()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ props drilling</text_info>`,
      description: `👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>`,
      message: `Prop <bg_warn>(items)</bg_warn> is being drilled through <bg_warn>ChildComponent</bg_warn> component unmodified. 🚨`,
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
    const result = reportPropsDrilling()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ props drilling</text_info>`,
      description: `👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>`,
      message: `Prop <bg_warn>(items)</bg_warn> is being drilled through <bg_warn>ChildComponent</bg_warn> component unmodified. 🚨`,
    }, {
      file: filePath,
      rule: `<text_info>rrd ~ props drilling</text_info>`,
      description: `👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>`,
      message: `Prop <bg_warn>(title)</bg_warn> is being drilled through <bg_warn>AnotherComponent</bg_warn> component unmodified. 🚨`,
    }])
  })
})
