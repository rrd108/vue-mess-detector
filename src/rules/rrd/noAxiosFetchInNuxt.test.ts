import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkNoAxiosFetchInNuxt, reportNoAxiosFetchInNuxt } from './noAxiosFetchInNuxt'

describe('checkNoAxiosFetchInNuxt', () => {
  it('should not report files that use Nuxt composables', () => {
    const script = {
      content: `
        <script setup>
        const { data } = await useFetch('/api/data')
        const asyncData = await useAsyncData('key', () => $fetch('/api/other'))
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noAxiosFetchInNuxt-clean.vue'
    checkNoAxiosFetchInNuxt(script, fileName)
    const result = reportNoAxiosFetchInNuxt()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files that use axios directly', () => {
    const script = {
      content: `
        <script setup>
        import axios from 'axios'
        const { data } = await axios.get('/api/users')
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noAxiosFetchInNuxt-axios.vue'
    checkNoAxiosFetchInNuxt(script, fileName)
    const result = reportNoAxiosFetchInNuxt()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ no axios or fetch in nuxt</text_info>`,
      description: `👉 <text_warn>Avoid using axios or fetch directly in Nuxt. Use useFetch, useAsyncData, or $fetch instead for proper SSR and data handling.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-axios-fetch-in-nuxt.html`,
      message: `line #3 <bg_warn>Direct HTTP call detected: axios</bg_warn> 🚨`,
    }])
  })

  it('should report files that use fetch directly', () => {
    const script = {
      content: `
        <script setup>
        const response = await fetch('/api/data')
        const result = await response.json()
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noAxiosFetchInNuxt-fetch.vue'
    checkNoAxiosFetchInNuxt(script, fileName)
    const result = reportNoAxiosFetchInNuxt()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ no axios or fetch in nuxt</text_info>`,
      description: `👉 <text_warn>Avoid using axios or fetch directly in Nuxt. Use useFetch, useAsyncData, or $fetch instead for proper SSR and data handling.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-axios-fetch-in-nuxt.html`,
      message: `line #2 <bg_warn>Direct HTTP call detected: fetch</bg_warn> 🚨`,
    }])
  })

  it('should report multiple instances of axios and fetch', () => {
    const script = {
      content: `
        <script setup>
        const r1 = await fetch('/api/data')
        const r2 = await axios.post('/api/save', payload)
        const r3 = await fetch('/api/other')
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noAxiosFetchInNuxt-multiple.vue'
    checkNoAxiosFetchInNuxt(script, fileName)
    const result = reportNoAxiosFetchInNuxt()
    expect(result.length).toBe(3)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no axios or fetch in nuxt</text_info>`,
        description: `👉 <text_warn>Avoid using axios or fetch directly in Nuxt. Use useFetch, useAsyncData, or $fetch instead for proper SSR and data handling.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-axios-fetch-in-nuxt.html`,
        message: `line #2 <bg_warn>Direct HTTP call detected: fetch</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ no axios or fetch in nuxt</text_info>`,
        description: `👉 <text_warn>Avoid using axios or fetch directly in Nuxt. Use useFetch, useAsyncData, or $fetch instead for proper SSR and data handling.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-axios-fetch-in-nuxt.html`,
        message: `line #3 <bg_warn>Direct HTTP call detected: axios</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ no axios or fetch in nuxt</text_info>`,
        description: `👉 <text_warn>Avoid using axios or fetch directly in Nuxt. Use useFetch, useAsyncData, or $fetch instead for proper SSR and data handling.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-axios-fetch-in-nuxt.html`,
        message: `line #4 <bg_warn>Direct HTTP call detected: fetch</bg_warn> 🚨`,
      },
    ])
  })

  it('should not report $fetch or useFetch as violations', () => {
    const script = {
      content: `
        <script setup>
        const data1 = await $fetch('/api/data')
        const { data: data2 } = await useFetch('/api/users')
        const { data: data3 } = await useAsyncData('posts', () => $fetch('/api/posts'))
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noAxiosFetchInNuxt-nuxt-composables.vue'
    checkNoAxiosFetchInNuxt(script, fileName)
    const result = reportNoAxiosFetchInNuxt()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })
})