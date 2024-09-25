import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkNoDirectDomAccess, reportNoDirectDomAccess } from './noDirectDomAccess'

describe('checkNoDirectDomAccess', () => {
  it('should not report files without direct DOM access', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue'
        
        const message = ref('Hello, Vue!')
        const inputRef = ref(null)
        
        function focusInput() {
          inputRef.value.focus()
        }
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noDirectDomAccess.vue'
    checkNoDirectDomAccess(script, fileName)
    const result = reportNoDirectDomAccess()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with direct DOM access using getElementById', () => {
    const script = {
      content: `
        <script setup>
        function handleClick() {
          const element = document.getElementById('myElement')
          element.style.color = 'red'
        }
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noDirectDomAccess-getElementById.vue'
    checkNoDirectDomAccess(script, fileName)
    const result = reportNoDirectDomAccess()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ no direct dom access</text_info>`,
      description: `👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html`,
      message: `line #3 <bg_warn>Direct DOM access detected: getElementById(</bg_warn> 🚨`,
    }])
  })

  it('should report files with direct DOM access using querySelector', () => {
    const script = {
      content: `
        <script setup>
        import { onMounted } from 'vue'
        
        onMounted(() => {
          const element = document.querySelector('.my-class')
          element.textContent = 'Updated content'
        })
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noDirectDomAccess-querySelector.vue'
    checkNoDirectDomAccess(script, fileName)
    const result = reportNoDirectDomAccess()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ no direct dom access</text_info>`,
      description: `👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html`,
      message: `line #5 <bg_warn>Direct DOM access detected: querySelector(</bg_warn> 🚨`,
    }])
  })

  it('should report multiple instances of direct DOM access', () => {
    const script = {
      content: `
        <script setup>
        function updateElements() {
          const element1 = document.getElementById('element1')
          const element2 = document.getElementsByClassName('my-class')
          const element3 = document.querySelectorAll('.item')
        }
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noDirectDomAccess-multiple.vue'
    checkNoDirectDomAccess(script, fileName)
    const result = reportNoDirectDomAccess()
    expect(result.length).toBe(3)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no direct dom access</text_info>`,
        description: `👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html`,
        message: `line #3 <bg_warn>Direct DOM access detected: getElementById(</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ no direct dom access</text_info>`,
        description: `👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html`,
        message: `line #4 <bg_warn>Direct DOM access detected: getElementsByClassName(</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ no direct dom access</text_info>`,
        description: `👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html`,
        message: `line #5 <bg_warn>Direct DOM access detected: querySelectorAll(</bg_warn> 🚨`,
      },
    ])
  })
})
