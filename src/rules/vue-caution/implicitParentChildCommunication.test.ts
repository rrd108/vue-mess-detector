import { describe, expect, it, vi } from 'vitest';
import { SFCScriptBlock } from '@vue/compiler-sfc';
import { BG_ERR, BG_RESET, BG_WARN } from '../asceeCodes'
import { checkImplicitParentChildCommunication, reportImplicitParentChildCommunication } from './implicitParentChildCommunication';

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

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
      `
    } as SFCScriptBlock;
    const filename = 'no-implicit-pcc.vue'
    checkImplicitParentChildCommunication(script, filename)
    expect(reportImplicitParentChildCommunication()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
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
      `
    } as SFCScriptBlock;
    const filename = 'props-mutation.vue'
    const lineNumber = 7
    checkImplicitParentChildCommunication(script, filename)
    expect(reportImplicitParentChildCommunication()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
      `- ${filename}#${lineNumber} ${BG_WARN}(todo)${BG_RESET} 🚨`
    )
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
      `
    } as SFCScriptBlock;
    const filename = "parent-instance.vue"
    const lineNumber = 2
    checkImplicitParentChildCommunication(script, filename)
    expect(reportImplicitParentChildCommunication()).toBe(2)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
      `- ${filename}#${lineNumber} ${BG_WARN}(getCurrentInstance)${BG_RESET} 🚨`
    )
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
      `
    } as SFCScriptBlock;
    const filename = "complex-sample.vue"
    const lineNumber = 2
    checkImplicitParentChildCommunication(script, filename)
    expect(reportImplicitParentChildCommunication()).toBe(4)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
      `- ${filename}#${lineNumber} ${BG_WARN}(getCurrentInstance)${BG_RESET} 🚨`
    )
  })
})