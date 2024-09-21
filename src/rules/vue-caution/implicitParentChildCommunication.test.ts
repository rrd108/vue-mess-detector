import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkImplicitParentChildCommunication, reportImplicitParentChildCommunication } from './implicitParentChildCommunication'

describe('checkImplicitParentChildCommunication', () => {
  it('should not report files where there is no implicit parent-child communication', () => {
    const script = {
      content: `
        <script setup>
        defineProps({
          todo: {
            type: Object,
            required: true
          }
        })

        const emit = defineEmits(['input'])
        </script>

        <template>
          <input :value="todo.text" @input="emit('input', $event.target.value)" />
        </template>
      `,
    } as SFCScriptBlock
    const filename = 'no-implicit-pcc.vue'
    checkImplicitParentChildCommunication(script, filename)
    const result = reportImplicitParentChildCommunication()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where there is a prop mutation', () => {
    const script = {
      content: `
        <script setup>
        defineProps({
          todo: {
            type: Object,
            required: true
          }
        })
        </script>

        <template>
          <input v-model="todo.text" />
        </template>
      `,
    } as SFCScriptBlock
    const filename = 'props-mutation.vue'
    const lineNumber = 3
    const offenses = [{
      file: filename,
      rule: `<text_info>vue-caution ~ implicit parent-child communication</text_info>`,
      description: `👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `line #${lineNumber} <bg_warn>(todo)</bg_warn> 🚨`,
    }]
    checkImplicitParentChildCommunication(script, filename)
    const result = reportImplicitParentChildCommunication()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual(offenses)
  })

  it('should report files where $parent/getCurrentInstance is present', () => {
    const script = {
      content: `
        <script setup>
        import { getCurrentInstance } from 'vue'

        const props = defineProps({
          todo: {
            type: Object,
            required: true
          }
        })

        const instance = getCurrentInstance()

        function removeTodo() {
          const parent = instance.parent
          if (!parent) return

          parent.props.todos = parent.props.todos.filter((todo) => {
            return todo.id !== props.todo.id
          })
        }
        </script>

        <template>
          <span>
            {{ todo.text }}
            <button @click="removeTodo">×</button>
          </span>
        </template>
      `,
    } as SFCScriptBlock
    const filename = 'parent-instance.vue'
    const lineNumber = 2
    const offenses = [{
      file: filename,
      rule: `<text_info>vue-caution ~ implicit parent-child communication</text_info>`,
      description: `👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `line #${lineNumber} <bg_warn>(getCurrentInstance)</bg_warn> 🚨`,
    }]
    checkImplicitParentChildCommunication(script, filename)
    const result = reportImplicitParentChildCommunication()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual(offenses)
  })

  it('should report files where props mutation & $parent/getCurrentInstance are present', () => {
    const script = {
      content: `
        <script setup>
        import { getCurrentInstance } from 'vue'

        const props = defineProps({
          todo: {
            type: Object,
            required: true
          }
        })

        const instance = getCurrentInstance()

        function removeTodo() {
          const parent = instance.parent
          if (!parent) return

          parent.props.todos = parent.props.todos.filter((todo) => {
            return todo.id !== props.todo.id
          })
        }
        </script>

        <template>
          <span>
            {{ todo.text }}
            <input v-model="todo.text" />
          </span>
        </template>
      `,
    } as SFCScriptBlock
    const filename = 'complex-sample.vue'
    const offenses = [
      {
        file: filename,
        rule: `<text_info>vue-caution ~ implicit parent-child communication</text_info>`,
        description: `👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
        message: `line #5 <bg_warn>(todo)</bg_warn> 🚨`,
      },
      {
        file: filename,
        rule: `<text_info>vue-caution ~ implicit parent-child communication</text_info>`,
        description: `👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
        message: `line #2 <bg_warn>(getCurrentInstance)</bg_warn> 🚨`,
      },
    ]
    checkImplicitParentChildCommunication(script, filename)
    const result = reportImplicitParentChildCommunication()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual(offenses)
  })
})
