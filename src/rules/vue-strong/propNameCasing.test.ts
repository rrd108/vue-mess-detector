import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkPropNameCasing, reportPropNameCasing } from './propNameCasing'

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
    const result = reportPropNameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files with lowercased single-words props name', () => {
    const script = {
      content: `<script setup>
      import { ref } from 'vue'
      defineProps({
        message: String,
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'camelCase-prop-name.vue'
    checkPropNameCasing(script, fileName)
    const result = reportPropNameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files with lowercased single-words + camelCase props name', () => {
    const script = {
      content: `<script setup>
      import { ref } from 'vue'
      defineProps({
        message: String,
        isOpen: Boolean
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'camelCase-prop-name.vue'
    checkPropNameCasing(script, fileName)
    const result = reportPropNameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files with lowercased single-words + camelCase props name + complex type', () => {
    const script = {
      content: `<script setup>
        const props = defineProps({
          items: { required: true, type: Array as PropType<{ data: Record<string, boolean | string | number | Date>; height?: number }[]> },
          rowHeight: { default: 35, required: false, type: Number }
        });
      </script>`,
    } as SFCScriptBlock
    const fileName = 'complex-prop-type.vue'
    checkPropNameCasing(script, fileName)
    const result = reportPropNameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files with lowercased single-words + camelCase props name + commented camelCase prop', () => {
    const script = {
      content: `<script setup>
        const props = defineProps({
          // isDynamic: { default: false, required: false, type: Boolean },
          items: { required: true, type: Array as PropType<{ data: Record<string, boolean | string | number | Date>; height?: number }[]> },
          rowHeight: { default: 35, required: false, type: Number }
        });
      </script>`,
    } as SFCScriptBlock
    const fileName = 'commented-camelCase-prop-name.vue'
    checkPropNameCasing(script, fileName)
    const result = reportPropNameCasing()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with kebab-case props name', () => {
    const script = {
      content: `<script setup>
      const props = defineProps({
        'greeting-text': String
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'mixed-case-prop-name.vue'
    checkPropNameCasing(script, fileName)
    const result = reportPropNameCasing()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ prop names are not camelCased</text_info>`,
      description: `👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `prop names are <bg_warn>not camelCased</bg_warn> 🚨`,
    }])
  })

  it('should report files with PascalCase props name', () => {
    const script = {
      content: `<script setup>
      import { ref } from 'vue'
      defineProps({
        Message: String,
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'capitalized-prop-name.vue'
    checkPropNameCasing(script, fileName)
    const result = reportPropNameCasing()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ prop names are not camelCased</text_info>`,
      description: `👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `prop names are <bg_warn>not camelCased</bg_warn> 🚨`,
    }])
  })

  it('should report files with none camelCased props name', () => {
    const script = {
      content: `<script setup>
      import { ref } from 'vue'
      defineProps({
        Message: String,
        'greeting-text': String,
        'is_open': Boolean,
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'capitalized-prop-name.vue'
    checkPropNameCasing(script, fileName)
    const result = reportPropNameCasing()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ prop names are not camelCased</text_info>`,
      description: `👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `prop names are <bg_warn>not camelCased</bg_warn> 🚨`,
    }])
  })
})
