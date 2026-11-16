import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkComputedSideEffects, reportComputedSideEffects } from './computedSideEffects'

describe('checkComputedSideEffects', () => {
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
    const result = reportComputedSideEffects()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const result = reportComputedSideEffects()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const result = reportComputedSideEffects()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ computed side effects</text_info>`,
      description: `👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #6 side effect detected in computed property <bg_err>(someArray.value.push)</bg_err> 🚨`,
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
    const result = reportComputedSideEffects()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ computed side effects</text_info>`,
      description: `👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #6 side effect detected in computed property <bg_err>(someVariable.value =)</bg_err> 🚨`,
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
    const result = reportComputedSideEffects()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ computed side effects</text_info>`,
      description: `👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #7 side effect detected in computed property <bg_err>(someArray.value.push)</bg_err> 🚨`,
    }, {
      file: fileName,
      rule: `<text_info>rrd ~ computed side effects</text_info>`,
      description: `👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #12 side effect detected in computed property <bg_err>(otherVariable.value )</bg_err> 🚨`,
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
    const result = reportComputedSideEffects()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ computed side effects</text_info>`,
      description: `👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `line #1 side effect detected in computed property <bg_err>(someVariable.value =)</bg_err> 🚨`,
    }])
  })

  it('should not report a local variable named set (#621)', () => {
    const script = {
      content: `
        const currentSet = computed(() => {
            const set = usingDefault.value ? "Using default atom data" :
                                             "Using user atom data";
            return \`\${set}\${modified.value ? " (modified)" : ""}\`;
        });
      `,
    } as SFCScriptBlock
    const fileName = 'EditAtomData.vue'
    checkComputedSideEffects(script, fileName)
    const result = reportComputedSideEffects()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report local declarations or loop counters (#621)', () => {
    const script = {
      content: `
        const noComputeCompositions = computed(() => {

            // Disable if no structures
            if(countAccumulated.value === 0) return true;

            // Disabled if any specie is not represented in any component
            for(let j=0; j < ns; ++j) {
                let n = 0;
                for(let i=0; i < nc; ++i) n += count.value[i*ns+j];
                if(n === 0) return true;
            }
            return false;
        });
      `,
    } as SFCScriptBlock
    const fileName = 'AnalyzeStructureSetsCtrl.vue'
    checkComputedSideEffects(script, fileName)
    const result = reportComputedSideEffects()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should still report mutating method calls like .set(', () => {
    const script = {
      content: `
        const computedValue = computed(() => {
          lookup.set(key, value)
          return lookup
        })
      `,
    } as SFCScriptBlock
    const fileName = 'with-map-set.vue'
    checkComputedSideEffects(script, fileName)
    const result = reportComputedSideEffects()
    expect(result.length).toBe(1)
    expect(result[0].message).toContain('side effect detected in computed property')
  })

  it('should report property assignments, compound assignments and increments', () => {
    const script = {
      content: `
        const computedA = computed(() => {
          obj.x = 1
          return obj
        })

        const computedB = computed(() => {
          foo.value += 1
          return foo.value
        })

        const computedC = computed(() => {
          foo.value++
          return foo.value
        })
      `,
    } as SFCScriptBlock
    const fileName = 'with-property-mutations.vue'
    checkComputedSideEffects(script, fileName)
    const result = reportComputedSideEffects()
    expect(result.length).toBe(3)
  })

  it('should report assignments to identifiers declared outside the computed', () => {
    const script = {
      content: `
        let count = 0
        const computedValue = computed(() => {
          count = count + 1
          return count
        })
      `,
    } as SFCScriptBlock
    const fileName = 'with-outer-assignment.vue'
    checkComputedSideEffects(script, fileName)
    const result = reportComputedSideEffects()
    expect(result.length).toBe(1)
    expect(result[0].message).toContain('side effect detected in computed property')
  })
})
