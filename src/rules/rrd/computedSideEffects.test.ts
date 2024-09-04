import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkComputedSideEffects, reportComputedSideEffects, resetComputedSideEffects } from './computedSideEffects'

describe('checkComputedSideEffects', () => {
  beforeEach(() => {
    resetComputedSideEffects()
  })

  it('should not report files without side effects in computed properties', () => {
    const script = {
      content: `
        <script setup>
        import { computed, ref } from 'vue'

        const someValue = 2

        const computedValue = computed(() => {
          return someValue * 2
        })
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'no-side-effects.vue'
    checkComputedSideEffects(script, fileName)
    expect(reportComputedSideEffects().length).toBe(0)
    expect(reportComputedSideEffects()).toStrictEqual([])
  })

  it('should not report comparison operators as side effects', () => {
    const script = {
      content: `
        <script setup>
        import { computed } from 'vue'

        const computedValue = computed(() => {
          return someValue === 2 || otherValue == 3
        })
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'no-side-effects-comparison.vue'
    checkComputedSideEffects(script, fileName)
    expect(reportComputedSideEffects().length).toBe(0)
    expect(reportComputedSideEffects()).toStrictEqual([])
  })

  it('should report files with array mutation side effects in computed properties', () => {
    const script = {
      content: `
        <script setup>
          import { computed, ref } from 'vue'

          const someArray = ref([1, 2, 3])

          const computedValue = computed(() => {
            someArray.value.push(4)
            return someArray.value.length
          })
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'with-array-mutation.vue'
    checkComputedSideEffects(script, fileName)
    expect(reportComputedSideEffects().length).toBe(1)
    expect(reportComputedSideEffects()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ computed side effects${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid side effects in computed properties. Computed properties should only derive and return a value.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #6 side effect detected in computed property ${BG_ERR}(someArray.value.push)${BG_RESET} 🚨`,
    }])
  })

  it('should report files with assignment side effects in computed properties', () => {
    const script = {
      content: `
        <script setup>
        import { computed } from 'vue'

        const someVariable = ref('old value')

        const computedValue = computed(() => {
          someVariable.value = 'new value'
          return someVariable
        })
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'with-assignment.vue'
    checkComputedSideEffects(script, fileName)
    expect(reportComputedSideEffects().length).toBe(1)
    expect(reportComputedSideEffects()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ computed side effects${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid side effects in computed properties. Computed properties should only derive and return a value.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #6 side effect detected in computed property ${BG_ERR}(someVariable.value =)${BG_RESET} 🚨`,
    }])
  })

  it('should report multiple side effects in different computed properties', () => {
    const script = {
      content: `
        <script setup>
        import { computed } from 'vue'

        const someArray = ref([1, 2, 3])
        const otherVariable = ref('old value')

        const computedValue1 = computed(() => {
          someArray.value.push(newItem)
          return someArray.length
        })
      
        const computedValue2 = computed(() => {
          otherVariable.value = 'new value'
          return otherVariable
        })
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'multiple-side-effects.vue'
    checkComputedSideEffects(script, fileName)
    expect(reportComputedSideEffects().length).toBe(2)
    expect(reportComputedSideEffects()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ computed side effects${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid side effects in computed properties. Computed properties should only derive and return a value.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #7 side effect detected in computed property ${BG_ERR}(someArray.value.push)${BG_RESET} 🚨`,
    }, {
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ computed side effects${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid side effects in computed properties. Computed properties should only derive and return a value.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #12 side effect detected in computed property ${BG_ERR}(otherVariable.value )${BG_RESET} 🚨`,
    }])
  })

  it('should report files with assignment side effects in computed properties in js/ts files', () => {
    const script = {
      content: `
        const computedValue = computed(() => {
          someVariable.value = 'new value'
          return someVariable
        })
      `,
    } as SFCScriptBlock
    const fileName = 'with-assignment-in-jsts.vue'
    checkComputedSideEffects(script, fileName)
    expect(reportComputedSideEffects().length).toBe(1)
    expect(reportComputedSideEffects()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ computed side effects${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid side effects in computed properties. Computed properties should only derive and return a value.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #1 side effect detected in computed property ${BG_ERR}(someVariable.value =)${BG_RESET} 🚨`,
    }])
  })
})
