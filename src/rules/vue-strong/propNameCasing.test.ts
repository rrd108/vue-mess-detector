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
    expect(reportPropNameCasing().length).toBe(0)
    expect(reportPropNameCasing()).toStrictEqual([])
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
    expect(reportPropNameCasing().length).toBe(0)
    expect(reportPropNameCasing()).toStrictEqual([])
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
    expect(reportPropNameCasing().length).toBe(0)
    expect(reportPropNameCasing()).toStrictEqual([])
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
    expect(reportPropNameCasing().length).toBe(1)
    expect(reportPropNameCasing()).toStrictEqual([{
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
    expect(reportPropNameCasing().length).toBe(1)
    expect(reportPropNameCasing()).toStrictEqual([{
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
    expect(reportPropNameCasing().length).toBe(1)
    expect(reportPropNameCasing()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ prop names are not camelCased</text_info>`,
      description: `👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `prop names are <bg_warn>not camelCased</bg_warn> 🚨`,
    }])
  })
})
