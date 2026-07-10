import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkUseShallowRef, reportUseShallowRef } from './useShallowRef'

describe('checkUseShallowRef', () => {
  it('should not report files without ref usage', () => {
    const script = {
      content: `
      <script setup>
        import { computed } from 'vue'
        const count = computed(() => 42)
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-none.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where ref value is reassigned', () => {
    const script = {
      content: `
      <script setup>
        import { ref } from 'vue'
        const count = ref(0)
        function increment() {
          count.value++
        }
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-reassigned.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where ref value is assigned with =', () => {
    const script = {
      content: `
      <script setup>
        import { ref } from 'vue'
        const name = ref('initial')
        function setName() {
          name.value = 'updated'
        }
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-assigned.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where ref value is never reassigned', () => {
    const script = {
      content: `
      <script setup>
        import { ref } from 'vue'
        const config = ref({ theme: 'dark', lang: 'en' })
        console.log(config.value.theme)
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-not-reassigned.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(1)
    expect(result[0].file).toBe(fileName)
    expect(result[0].rule).toContain('use Shallow Ref')
    expect(result[0].message).toContain('ref used but .value is never reassigned')
  })

  it('should report multiple refs where value is never reassigned', () => {
    const script = {
      content: `
      <script setup>
        import { ref } from 'vue'
        const config = ref({ theme: 'dark' })
        const items = ref([])
        const count = ref(0)
        count.value = 5
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-multiple.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(2)
    expect(result[0].message).toContain('config')
    expect(result[1].message).toContain('items')
  })

  it('should handle ref with TypeScript generics', () => {
    const script = {
      content: `
      <script setup lang="ts">
        import { ref } from 'vue'
        const data = ref<ConfigType>({ name: 'test' })
        const toggle = ref<boolean>(false)
        toggle.value = true
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-generics.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(1)
    expect(result[0].message).toContain('data')
  })

  it('should not report when ref has no variable name', () => {
    const script = {
      content: `
      <script setup>
        import { ref } from 'vue'
        const obj = { key: ref('value') }
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-no-var.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    // This ref is inside an object literal, not a direct const x = ref()
    // It should not match our regex pattern
    expect(result.length).toBe(0)
  })

  it('should not report shallowRef usage', () => {
    const script = {
      content: `
      <script setup>
        import { shallowRef } from 'vue'
        const config = shallowRef({ theme: 'dark' })
        console.log(config.value.theme)
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-already-shallow.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(0)
  })

  it('should detect compound assignment operators', () => {
    const script = {
      content: `
      <script setup>
        import { ref } from 'vue'
        const total = ref(0)
        function addToTotal(val) {
          total.value += val
        }
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'useShallowRef-compound.vue'
    checkUseShallowRef(script, fileName)
    const result = reportUseShallowRef()
    expect(result.length).toBe(0)
  })
})
