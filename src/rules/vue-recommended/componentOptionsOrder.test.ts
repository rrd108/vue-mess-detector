import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkComponentOptionsOrder, reportComponentOptionsOrder } from './componentOptionsOrder'

describe('checkComponentOptionsOrder', () => {
  it('should not report when script setup options are in the recommended order', () => {
    const script = {
      content: `<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps<{ msg: string }>()
const emit = defineEmits<{ (e: 'update'): void }>()

const count = ref(0)
const doubled = computed(() => count.value * 2)
watch(count, (val) => console.log(val))

function increment() {
  count.value++
}

onMounted(() => {
  console.log('mounted')
})
</script>`,
    } as SFCScriptBlock
    const filename = 'correct-order.vue'
    checkComponentOptionsOrder(script, filename)
    const result = reportComponentOptionsOrder()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when some categories are missing', () => {
    const script = {
      content: `<script setup>
import { ref } from 'vue'

const props = defineProps<{ msg: string }>()
const count = ref(0)
</script>`,
    } as SFCScriptBlock
    const filename = 'partial-order.vue'
    checkComponentOptionsOrder(script, filename)
    const result = reportComponentOptionsOrder()
    expect(result.length).toBe(0)
  })

  it('should report when computed comes before reactive state', () => {
    const script = {
      content: `<script setup>
import { ref, computed } from 'vue'

const props = defineProps<{ msg: string }>()
const doubled = computed(() => count.value * 2)
const count = ref(0)
</script>`,
    } as SFCScriptBlock
    const filename = 'wrong-order.vue'
    checkComponentOptionsOrder(script, filename)
    const result = reportComponentOptionsOrder()
    expect(result.length).toBe(1)
    expect(result[0].file).toBe(filename)
    expect(result[0].message).toContain('reactive state should come before')
  })

  it('should report when lifecycle hooks come before methods', () => {
    const script = {
      content: `<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)

onMounted(() => {
  console.log('mounted')
})

function increment() {
  count.value++
}
</script>`,
    } as SFCScriptBlock
    const filename = 'lifecycle-before-methods.vue'
    checkComponentOptionsOrder(script, filename)
    const result = reportComponentOptionsOrder()
    expect(result.length).toBe(1)
    expect(result[0].file).toBe(filename)
    expect(result[0].message).toContain('methods should come before')
  })

  it('should report when defineEmits comes after composables', () => {
    const script = {
      content: `<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits<{ (e: 'update'): void }>()
const count = ref(0)
</script>`,
    } as SFCScriptBlock
    const filename = 'emits-after-composables.vue'
    checkComponentOptionsOrder(script, filename)
    const result = reportComponentOptionsOrder()
    expect(result.length).toBe(1)
    expect(result[0].file).toBe(filename)
    expect(result[0].message).toContain('defineEmits should come before')
  })

  it('should not report when there is no script', () => {
    const script = null
    const filename = 'no-script.vue'
    checkComponentOptionsOrder(script, filename)
    const result = reportComponentOptionsOrder()
    expect(result.length).toBe(0)
  })

  it('should report only once per file even with multiple violations', () => {
    const script = {
      content: `<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps<{ msg: string }>()
const doubled = computed(() => count.value * 2)
const count = ref(0)
watch(count, (val) => console.log(val))
onMounted(() => {
  console.log('mounted')
})
function increment() {
  count.value++
}
</script>`,
    } as SFCScriptBlock
    const filename = 'multiple-violations.vue'
    checkComponentOptionsOrder(script, filename)
    const result = reportComponentOptionsOrder()
    expect(result.length).toBe(1)
  })
})
