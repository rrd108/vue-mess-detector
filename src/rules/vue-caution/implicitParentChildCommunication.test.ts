import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkImplicitParentChildCommunication, reportImplicitParentChildCommunication, resetImplicitParentChildCommunicationFiles } from './implicitParentChildCommunication'

describe('checkImplicitParentChildCommunication', () => {
  beforeEach(() => {
    resetImplicitParentChildCommunicationFiles()
  })

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
    expect(reportImplicitParentChildCommunication().length).toBe(0)
    expect(reportImplicitParentChildCommunication()).toStrictEqual([])
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
      rule: `${TEXT_INFO}vue-caution ~ implicit parent-child communication${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `line #${lineNumber} ${BG_WARN}(todo)${BG_RESET} 🚨`,
    }]
    checkImplicitParentChildCommunication(script, filename)
    expect(reportImplicitParentChildCommunication().length).toBe(1)
    expect(reportImplicitParentChildCommunication()).toStrictEqual(offenses)
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
      rule: `${TEXT_INFO}vue-caution ~ implicit parent-child communication${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `line #${lineNumber} ${BG_WARN}(getCurrentInstance)${BG_RESET} 🚨`,
    }]
    checkImplicitParentChildCommunication(script, filename)
    expect(reportImplicitParentChildCommunication().length).toBe(1)
    expect(reportImplicitParentChildCommunication()).toStrictEqual(offenses)
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
        rule: `${TEXT_INFO}vue-caution ~ implicit parent-child communication${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
        message: `line #5 ${BG_WARN}(todo)${BG_RESET} 🚨`,
      },
      {
        file: filename,
        rule: `${TEXT_INFO}vue-caution ~ implicit parent-child communication${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
        message: `line #2 ${BG_WARN}(getCurrentInstance)${BG_RESET} 🚨`,
      },
    ]
    checkImplicitParentChildCommunication(script, filename)
    expect(reportImplicitParentChildCommunication().length).toBe(2)
    expect(reportImplicitParentChildCommunication()).toStrictEqual(offenses)
  })
})
