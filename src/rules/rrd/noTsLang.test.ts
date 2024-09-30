import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkNoTsLang, reportNoTsLang } from './noTsLang'

describe('checkNoTsLang', () => {
  it('should not report files with ts lang', () => {
    const script = {
      content: `
        <script setup lang="ts">
        import { ref } from 'vue'
        import type { Product } from '@/types/product'

        const products: Product[] = ref([{ name: 'Apple', price: 1 }, { name: 'Banana', price: 2 }])

        // more content here...
        </script>
      `,
      lang: 'ts',
    } as SFCScriptBlock
    const fileName = 'ts-lang.vue'
    checkNoTsLang(script, fileName)
    const result = reportNoTsLang()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files with tsx lang', () => {
    const script = {
      content: `
        <script setup lang="tsx">
        // some magic content here...
        </script>
      `,
      lang: 'tsx',
    } as SFCScriptBlock
    const fileName = 'tsx-lang.vue'
    checkNoTsLang(script, fileName)
    const result = reportNoTsLang()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where lang ts is not used', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue'

        const products = ref([{ name: 'Apple', price: 1 }, { name: 'Banana', price: 2 }])

        // more content here...
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'no-ts-lang-problem.vue'
    checkNoTsLang(script, fileName)
    const result = reportNoTsLang()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ no ts lang</text_info>`,
      description: `👉 <text_warn>Use typescript instead of javascript.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-ts-lang.html`,
      message: `<bg_warn>component uses js instead of ts</bg_warn> 🚨`,
    }])
  })
})
