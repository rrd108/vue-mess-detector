import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkSimpleProp, reportSimpleProp } from './simpleProp'

describe('checkSimpleProp', () => {
  it('should not report files with detailed props definition', () => {
    const script = {
      content: `<script setup>
    const props = defineProps({
        status: String
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'proper-prop.vue'
    checkSimpleProp(script, fileName)
    const result = reportSimpleProp()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with simple props definition', () => {
    const script = {
      content: `<script setup>
    const props = defineProps(['status'])
    </script>`,
    } as SFCScriptBlock
    const fileName = 'simple-prop.vue'
    checkSimpleProp(script, fileName)
    const result = reportSimpleProp()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ simple prop</text_info>`,
      description: `👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `<bg_err>Props type</bg_err> not defined 🚨`,
    }])
  })

  it('should report files with simple props definition with spaces', () => {
    const script = {
      content: `<script setup>
      const props = defineProps( ['items'] )
      </script>`,
    } as SFCScriptBlock
    const fileName = 'simple-prop.vue'
    checkSimpleProp(script, fileName)
    const result = reportSimpleProp()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ simple prop</text_info>`,
      description: `👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `<bg_err>Props type</bg_err> not defined 🚨`,
    }])
  })

  it('should report files with simple props definition with comments', () => {
    const script = {
      content: `<script setup>
      const props = defineProps(/* foo */['items'])
      </script>`,
    } as SFCScriptBlock
    const fileName = 'simple-prop.vue'
    checkSimpleProp(script, fileName)
    const result = reportSimpleProp()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ simple prop</text_info>`,
      description: `👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `<bg_err>Props type</bg_err> not defined 🚨`,
    }])
  })

  it('should report files with simple props definition with new line', () => {
    const script = {
      content: `<script setup>
      const props = defineProps(
        [
          'items',
        ],
      )
      </script>`,
    } as SFCScriptBlock
    const fileName = 'simple-prop.vue'
    checkSimpleProp(script, fileName)
    const result = reportSimpleProp()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ simple prop</text_info>`,
      description: `👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `<bg_err>Props type</bg_err> not defined 🚨`,
    }])
  })

  it('should report files with simple props definition with new line and comments', () => {
    const script = {
      content: `<script setup>
      const props = defineProps( // foo
        [
          'items',
        ],
      )
      </script>`,
    } as SFCScriptBlock
    const fileName = 'simple-prop.vue'
    checkSimpleProp(script, fileName)
    const result = reportSimpleProp()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ simple prop</text_info>`,
      description: `👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `<bg_err>Props type</bg_err> not defined 🚨`,
    }])
  })
})

// with a newline

// with a newline and a comment
