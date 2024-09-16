import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'

import { checkNoPropDestructure, reportNoPropDestructure, resetNoPropDestructure } from './noPropDestructure'

describe('checkNoPropDestructure', () => {
  beforeEach(() => {
    resetNoPropDestructure()
  })

  it('should not report files without props destructuring', () => {
    const script = {
      content: `
      <script setup>
        const props = defineProps();
        const myProp = props.myprop;
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noPropDestructure.vue'
    checkNoPropDestructure(script, fileName)
    expect(reportNoPropDestructure().length).toBe(0)
    expect(reportNoPropDestructure()).toStrictEqual([])
  })

  it('should report files with single props destructuring using defineProps', () => {
    const script = {
      content: `
      <script setup>
        const { propA } = defineProps();
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noPropDestructure-single.vue'
    checkNoPropDestructure(script, fileName)
    const offenses = reportNoPropDestructure()
    expect(offenses.length).toBe(1)
    expect(offenses).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description: `👉 <text_warn>Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #3 <bg_warn>props destructuring found: const { propA } = defineProps()</bg_warn> 🚨`,
      },
    ])
  })

  it('should report files with multiple props destructuring instances using defineProps', () => {
    const script = {
      content: `
      <script setup>
        const { propA } = defineProps();
        const { propB } = defineProps();
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noPropDestructure-multiple.vue'
    checkNoPropDestructure(script, fileName)
    const offenses = reportNoPropDestructure()
    expect(offenses.length).toBe(2)
    expect(offenses).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description: `👉 <text_warn>Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #3 <bg_warn>props destructuring found: const { propA } = defineProps()</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description: `👉 <text_warn>Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #4 <bg_warn>props destructuring found: const { propB } = defineProps()</bg_warn> 🚨`,
      },
    ])
  })

  it('should report files with props destructuring and default values using defineProps', () => {
    const script = {
      content: `
      <script setup>
        const { propA = 'default', propB } = defineProps();
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noPropDestructure-default.vue'
    checkNoPropDestructure(script, fileName)
    const offenses = reportNoPropDestructure()
    expect(offenses.length).toBe(1)
    expect(offenses).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description: `👉 <text_warn>Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #3 <bg_warn>props destructuring found: const { propA = 'default', propB } = defineProps()</bg_warn> 🚨`,
      },
    ])
  })

  it('should not report files with destructuring of other variables', () => {
    const script = {
      content: `
      <script setup>
        const { someVar } = ref('value');
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noPropDestructure-other-vars.vue'
    checkNoPropDestructure(script, fileName)
    expect(reportNoPropDestructure().length).toBe(0)
    expect(reportNoPropDestructure()).toStrictEqual([])
  })

  it('should report files where props are destructured and used in expressions', () => {
    const script = {
      content: `
      <script setup>
        const { propA } = defineProps();
        console.log(propA);
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'noPropDestructure-expressions.vue'
    checkNoPropDestructure(script, fileName)
    const offenses = reportNoPropDestructure()
    expect(offenses.length).toBe(1)
    expect(offenses).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description: `👉 <text_warn>Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #3 <bg_warn>props destructuring found: const { propA } = defineProps()</bg_warn> 🚨`,
      },
    ])
  })
})
